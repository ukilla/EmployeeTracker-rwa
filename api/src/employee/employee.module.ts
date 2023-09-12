import { Module } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './models/employee.entity';
import { DepartmentModule } from 'src/department/department.module';
import { JwtModule } from '@nestjs/jwt';
import { LoggedGuard } from 'src/guards/logged.guard';

@Module({
  imports:[DepartmentModule,TypeOrmModule.forFeature([EmployeeEntity]),JwtModule.register({
    secret:"secret",
    signOptions: { expiresIn: '1d' },
  })],
  controllers: [EmployeeController],
  providers: [EmployeeService,LoggedGuard],
})
export class EmployeeModule {}
