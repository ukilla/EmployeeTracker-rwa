import { Controller, Post, Body, Get } from '@nestjs/common';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.class';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() department: Department) {
    return this.departmentService.createDepartment(department);
  }

  @Get('byId')
  find(@Body() department: Department) {
    return this.departmentService.findDepartment(department.id);
  }

  @Get('getDepartments')
  getDepartments() {
    return this.departmentService.getDepartments();
  }
}
