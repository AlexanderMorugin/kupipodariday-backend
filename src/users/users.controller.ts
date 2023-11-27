/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req) {
    const { password, ...rest } = await this.usersService.findOne(
      'id',
      req.user.id,
    );
    return rest;
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async update(@Req() req, @Body() body) {
    return this.usersService.update(req.user, body);
  }
}
