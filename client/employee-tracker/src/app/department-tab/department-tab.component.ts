import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Department } from '../models/department';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-department-tab',
  templateUrl: './department-tab.component.html',
  styleUrls: ['./department-tab.component.css'],
})
export class DepartmentTabComponent {
  constructor(private employeeService: EmployeeService) {}
  @Input() department: any;
  active: boolean = false;
  employeesVisible: boolean = false;
  employees:any;

  ngOnInit() {
    this.loadEmployees();
  }

  toggleEmployeesVisibility() {
    this.employeesVisible = !this.employeesVisible;
  }

  loadEmployees() {
    this.employeeService.employeesFromDepartment(this.department.id).subscribe(
      (data: any) => {
        this.employees = data;
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
}
