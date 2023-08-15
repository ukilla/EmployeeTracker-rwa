import { Controller, Post, Request, UseGuards, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService){}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {

  }
}
