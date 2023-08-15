import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/user/services/user.service';
import { UserEntity } from 'src/user/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UserService,
    },
    LocalStrategy,
  ],
})
export class AuthModule {}
