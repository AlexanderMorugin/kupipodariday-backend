/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(key: string, param: any) {
    const user = await this.usersRepository.findOneBy({ [key]: param });

    return user;
  }

  async hashPassword(password: string) {
    return bycrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto?.password);
    const user = await this.usersRepository.save(createUserDto);

    return { user };
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
}
