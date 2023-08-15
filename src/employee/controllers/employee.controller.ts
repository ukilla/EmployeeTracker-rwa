import { Controller } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.class';
import { Body, Post, Put, Get } from '@nestjs/common/decorators';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() employeeData: Employee) {
    return this.employeeService.createEmployee(employeeData);
  }
  @Put('overtime')
  addOvertime(@Body() data) {
    const { overtimeDate, overtimeHours, employeeId } = data;
    return this.employeeService.addOvertime(
      employeeId,
      overtimeDate,
      overtimeHours,
    );
  }
  @Put('takenLeave')
  addTakenLeave(@Body() data) {
    const { employeeId, takenLeaveDate } = data;
    return this.employeeService.addLeaveDate(employeeId, takenLeaveDate);
  }

  @Get()
  getEmployees() {
    return this.employeeService.getEmployees();
  }
  
  @Get('byDepartment')
  getByDepartment(@Body() data) {
    const { departmentId } = data;
    return this.employeeService.employeesFromDepartment(departmentId);
  }
}
