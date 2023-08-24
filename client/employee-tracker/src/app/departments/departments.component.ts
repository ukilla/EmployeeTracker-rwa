import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { Department } from '../models/department';
import { Employee } from '../models/employee';
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}
  departments: Department[] = [];
  employees: Employee[] = [];
  ngOnInit() {
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.employeeService.getDepartments().subscribe(
      (data: any) => {
        this.departments = data.map((department: any) => ({
          ...department,
          showEmployees: false,
          employees: [],
        }));
      },
      (error: any) => {
        console.error('Error fetching departments:', error);
      }
    );
  }
}
