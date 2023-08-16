import { Controller, Post, Body, Get, UseGuards, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.class';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../dtos/LoginDto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.userService.login(loginDto);
    response.cookie('jwt', token, { httpOnly: true });
    return { message: 'success' };
  }
}
