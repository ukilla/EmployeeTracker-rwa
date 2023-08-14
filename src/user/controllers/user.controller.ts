import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.class';
import { Observable } from 'rxjs';

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
}
