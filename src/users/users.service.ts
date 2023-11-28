/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(key: string, param: any): Promise<User> {
    const user = await this.usersRepository.findOneBy({ [key]: param });

    return user;
  }

  async hashPassword(password: string) {
    return bycrypt.hash(password, 10);
  }

  async findUserByName(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const username = await this.findUserByName(createUserDto.username);
    const email = await this.findByEmail(createUserDto.email);
    if (username !== null) {
      throw new ForbiddenException(
        'Пользователь с таким именем уже существует',
      );
    }
    if (email) {
      throw new ForbiddenException(
        'Пользователь с таким e-mail уже существует',
      );
    }
    createUserDto.password = await this.hashPassword(createUserDto?.password);
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    const { id } = user;
    const { email, username } = updateUserDto;
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }
    const isExist = (await this.usersRepository.findOne({
      where: [{ email }, { username }],
    }))
      ? true
      : false;

    if (isExist) {
      throw new ConflictException(
        'Пользователь с таким email или username уже зарегистрирован',
      );
    }
    try {
      await this.usersRepository.update(id, updateUserDto);
      const { password, ...updUser } = await this.usersRepository.findOneBy({
        id,
      });
      return updUser;
    } catch (_) {
      throw new BadRequestException('Ошибка валидации переданных значений');
    }
  }

  async findWishes(id: number) {
    const users = await this.usersRepository.find({
      relations: { wishes: true },
      where: { id },
    });
    return users;
  }

  async findMany(query: string) {
    const searchResult = await this.usersRepository.find({
      where: [{ email: Like(`%${query}%`) }, { username: Like(`%${query}%`) }],
    });
    return searchResult;
  }
}
