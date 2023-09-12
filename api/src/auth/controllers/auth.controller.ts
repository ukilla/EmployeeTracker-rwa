import { Controller, Post, Request, UseGuards, Response, Put, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from 'src/employee/services/employee.service';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService){}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {

  }

}
