import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.class';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../dtos/LoginDto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }

  @Get('getUserByCookie')
  async getUserByCookie(@Req() request: any) {
    let cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    const userDb = await this.userService.findUser(data.username);
    return userDb;
  }
}
