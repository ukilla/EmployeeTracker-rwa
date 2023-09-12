import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { LoggedGuard } from 'src/guards/logged.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),JwtModule.register({
    secret:"secret",
    signOptions: { expiresIn: '1d' },
  })],
  providers: [UserService,LoggedGuard],
  controllers: [UserController],
})
export class UserModule {}
