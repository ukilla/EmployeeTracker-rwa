import { Injectable } from '@nestjs/common';
import { Department } from '../models/department.class';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from '../models/department.entity';
import { Repository } from 'typeorm';
import { EmployeeEntity } from 'src/employee/models/employee.entity';
import { Employee } from 'src/employee/models/employee.class';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async createDepartment(department: Department) {
    return this.departmentRepository.save(department);
  }

  async findDepartment(departmentId: number) {
    return this.departmentRepository.findOneById(departmentId);
  }

  async addEmployee(departmentId: number, employee: EmployeeEntity) {
    const department = await this.findDepartment(departmentId);
    return this.departmentRepository.save(department);
  }

  async getDepartments() {
    const departments = await this.departmentRepository.find();
    for(let department of departments){
    }
    return this.departmentRepository.find();
  }
}
