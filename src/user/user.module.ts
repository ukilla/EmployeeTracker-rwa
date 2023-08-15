import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),JwtModule.register({

    secret:"secret",
    signOptions: { expiresIn: '1d' },
  })],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
