import { Controller, Post, Request, UseGuards, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {

  }
}
