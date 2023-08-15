import { Injectable, Inject } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}
  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUser(username);
    const isMatch = await bcrypt.compare(password,userDB.password); 
    if (userDB && isMatch) {
      console.log('User logged in');
      return userDB;
    }
    return null;
  }
}
