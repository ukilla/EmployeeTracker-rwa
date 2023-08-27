import { Controller } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.class';
import { Body, Post, Put, Get, Query } from '@nestjs/common/decorators';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('addEmployee')
  create(@Body() employeeData: Employee) {
    return this.employeeService.createEmployee(employeeData);
  }

  @Post('deleteEmployee')
  deleteEmployee(@Body() data) {
    const { employeeId } = data;
    return this.employeeService.deleteEmployee(employeeId);
  }

  @Put('addOvertime')
  addOvertime(@Body() data) {
    const { overtimeDate, overtimeHours, employeeId } = data;
    return this.employeeService.addOvertime(
      employeeId,
      overtimeDate,
      overtimeHours,
    );
  }
  @Put('addTakenLeave')
  addTakenLeave(@Body() data) {
    const { employeeId, takenLeaveDate } = data;
    return this.employeeService.addLeaveDate(employeeId, takenLeaveDate);
  }

  @Put('addDutyDate')
  addDutyDate(@Body() data) {
    const { employeeId, dutyDate } = data;
    console.log(employeeId, dutyDate);
    return this.employeeService.addDutyDate(employeeId, dutyDate);
  }

  @Put('addVacationDate')
  addVacationDate(@Body() data) {
    const { employeeId, vacationDate } = data;
    return this.employeeService.addVacationDate(employeeId, vacationDate);
  }

  @Get('getEmployees')
  getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Put('byDepartment')
  getByDepartment(@Body() data) {
    const { departmentId } = data;
    return this.employeeService.employeesFromDepartment(departmentId);
  }

  @Get('departmentName')
  getDepartmentName(@Body() data) {
    const { employeeId } = data;
    return this.employeeService.getDepartmentName(employeeId);
  }

  @Get('dutyDate')
  getDutyDate(@Query('employeeId') employeeId: number) {
    return this.employeeService.getDutyDate(employeeId);
  }

  @Put('deleteDutyDate')
  deleteDutyDate(@Body() data) {
    const { employeeId, dutyDateDelete } = data;
    return this.employeeService.deleteDutyDate(employeeId, dutyDateDelete);
  }

  @Put('deleteTakenLeaveDate')
  deleteTakenLeaveDate(@Body() data) {
    const { employeeId, takenLeaveDateDelete } = data;
    return this.employeeService.deleteTakenLeaveDate(
      employeeId,
      takenLeaveDateDelete,
    );
  }

  @Put('deleteVacationDate')
  deleteVacationDate(@Body() data) {
    const { employeeId, vacationDateDelete } = data;
    return this.employeeService.deleteVacationDate(
      employeeId,
      vacationDateDelete,
    );
  }

  @Put('addServiceOffering')
  addServiceOffering(@Body() data) {
    const { employeeId, numberOfServices, date } = data;
    return this.employeeService.addServiceOffering(
      employeeId,
      numberOfServices,
      date,
    );
  }

  @Put('getServiceOfferings')
  getServiceOfferings(@Body() data) {
    const { employeeId, date } = data;
    return this.employeeService.getServiceOfferingsForDate(employeeId, date);
  }
}
