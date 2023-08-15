import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from '../models/employee.entity';
import { Repository } from 'typeorm';
import { Employee } from '../models/employee.class';
import { DepartmentEntity } from 'src/department/models/department.entity';
import { DepartmentService } from 'src/department/services/department.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    private readonly departmentService: DepartmentService,
  ) {}

  async findEmployee(employeeId: number) {
    const employee = await this.employeeRepository.findOneById(employeeId);
    if (!employee) {
      throw new BadRequestException("Employee doesn't exist");
    }
    return employee;
  }

  async createEmployee(employeeData: Employee) {
    const department = await this.departmentService.findDepartment(
      employeeData.departmentId,
    );
    if (!department) {
      throw new Error('Department not found');
    }
    const employee = new EmployeeEntity();
    employee.firstName = employeeData.firstName;
    employee.lastName = employeeData.lastName;
    employee.department = department;
    this.departmentService.addEmployee(department.id, employee);
    return this.employeeRepository.save(employee);
  }

  async addOvertime(
    employeeId: number,
    overtimeDate: Date,
    overtimeHours: number,
  ) {
    const employee = await this.findEmployee(employeeId);
    if (!employee.overtimeDate) {
      employee.overtimeDate = [];
    }
    employee.overtimeDate.push(overtimeDate);
    employee.overtimeHours += overtimeHours;
    return this.employeeRepository.save(employee);
  }

  async addLeaveDate(employeeId: number, takenLeaveDate: Date) {
    const employee = await this.findEmployee(employeeId);
    if (!employee.takenLeaveDate) {
      employee.takenLeaveDate = [];
    }
    employee.takenLeaveDate.push(takenLeaveDate);
    return this.employeeRepository.save(employee);
  }

  async getEmployees() {
    return this.employeeRepository.find();
  }

  async employeesFromDepartment(departmentId: number) {
    return this.employeeRepository
      .createQueryBuilder('employee')
      .where('employee.departmentId = :departmentId', { departmentId })
      .getMany();
  }
}
