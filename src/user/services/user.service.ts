import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.class';
import { Observable, from } from 'rxjs';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: User): Promise<User> {
    const { username, password } = user;
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    user.password=hashedPwd;
    return this.userRepository.save(user);
  }

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUser(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
