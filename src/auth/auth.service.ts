import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import * as bycrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userByName = await this.usersService.findOne(
      'username',
      createUserDto.username,
    );

    const userByEmail = await this.usersService.findOne(
      'email',
      createUserDto.email,
    );

    if (userByName || userByEmail)
      throw new ConflictException(
        'Пользователь с таким email или username уже зарегистрирован',
      );

    return this.usersService.create(createUserDto);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const existUser = await this.usersService.findOne('username', username);

    if (!existUser)
      throw new BadRequestException(
        'Пользователя с таким Юзернейм не существует',
      );

    const passwordIsMatches = await bycrypt.compare(
      password,
      existUser.password,
    );
    if (!passwordIsMatches)
      throw new UnauthorizedException('Некорректная пара логин и пароль');

    return existUser;
  }

  async login(user: User) {
    const { id, username, email } = user;
    return {
      id,
      username,
      email,
      access_token: this.jwtService.sign({
        id: user.id,
        username: user.username,
      }),
    };
  }
}
