import { Module } from '@nestjs/common';
import { DepartmentService } from './services/department.service';
import { DepartmentController } from './controllers/department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from './models/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
