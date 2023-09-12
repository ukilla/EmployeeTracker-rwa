import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.class';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies['jwt'];
    if (!cookie) {
      return false;
    } else {
      return true;
    }
  }
}
