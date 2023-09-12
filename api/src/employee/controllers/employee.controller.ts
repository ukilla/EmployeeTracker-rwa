import { Controller } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.class';
import { Body, Post, Put, Get, Query, Delete, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { LoggedGuard } from 'src/guards/logged.guard';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('addEmployee')
  @UseGuards(LoggedGuard)
  create(@Body() employeeData: Employee) {
    return this.employeeService.createEmployee(employeeData);
  }

  @Post('deleteEmployee')
  @UseGuards(LoggedGuard)
  deleteEmployee(@Body() data) {
    const { employeeId } = data;
    return this.employeeService.deleteEmployee(employeeId);
  }
  @Put('addOvertime')
  @UseGuards(LoggedGuard)
  addOvertime(@Body() data) {
    const { employeeId, overtimeDate, overtimeHours } = data;
    return this.employeeService.addOvertime(
      employeeId,
      overtimeDate,
      overtimeHours,
    );
  }
  @Put('addTakenLeave')
  @UseGuards(LoggedGuard)
  addTakenLeave(@Body() data) {
    const { employeeId, takenLeaveDate } = data;
    return this.employeeService.addLeaveDate(employeeId, takenLeaveDate);
  }

  @Put('addDutyDate')
  @UseGuards(LoggedGuard)
  addDutyDate(@Body() data) {
    const { employeeId, dutyDate } = data;
    console.log(employeeId, dutyDate);
    return this.employeeService.addDutyDate(employeeId, dutyDate);
  }

  @Put('addVacationDate')
  @UseGuards(LoggedGuard)
  addVacationDate(@Body() data) {
    const { employeeId, vacationDate } = data;
    return this.employeeService.addVacationDate(employeeId, vacationDate);
  }

  @Get('getEmployees')
  @UseGuards(LoggedGuard)
  getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Put('byDepartment')
  @UseGuards(LoggedGuard)
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
  @UseGuards(LoggedGuard)
  getDutyDate(@Query('employeeId') employeeId: number) {
    return this.employeeService.getDutyDate(employeeId);
  }

  @Put('deleteDutyDate')
  @UseGuards(LoggedGuard)
  deleteDutyDate(@Body() data) {
    const { employeeId, dutyDateDelete } = data;
    return this.employeeService.deleteDutyDate(employeeId, dutyDateDelete);
  }

  @Put('deleteTakenLeaveDate')
  @UseGuards(LoggedGuard)
  deleteTakenLeaveDate(@Body() data) {
    const { employeeId, takenLeaveDateDelete } = data;
    return this.employeeService.deleteTakenLeaveDate(
      employeeId,
      takenLeaveDateDelete,
    );
  }

  @Put('deleteVacationDate')
  @UseGuards(LoggedGuard)
  deleteVacationDate(@Body() data) {
    const { employeeId, vacationDateDelete } = data;
    return this.employeeService.deleteVacationDate(
      employeeId,
      vacationDateDelete,
    );
  }

  @Put('addServiceOffering')
  @UseGuards(LoggedGuard)
  addServiceOffering(@Body() data) {
    const { employeeId, numberOfServices, date } = data;
    return this.employeeService.addServiceOffering(
      employeeId,
      numberOfServices,
      date,
    );
  }

  @Put('getServiceOfferings')
  @UseGuards(LoggedGuard)
  getServiceOfferings(@Body() data) {
    const { employeeId, date } = data;
    return this.employeeService.getServiceOfferingsForDate(employeeId, date);
  }

  @Post('deleteServiceOffering')
  @UseGuards(LoggedGuard)
  deleteServiceOffering(@Body() data) {
    const { employeeId, date } = data;
    return this.employeeService.deleteServiceOffering(employeeId, date);
  }
  @Put('deleteOvertime')
  @UseGuards(LoggedGuard)
  deleteOvertime(@Body() data) {
    const { employeeId, date } = data;
    return this.employeeService.deleteOvertime(employeeId, date);
  }
}
