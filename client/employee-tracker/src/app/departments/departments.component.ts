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
  searchQuery: string = ''; 
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

  filterDepartments() {
    if (this.searchQuery) {
      this.departments = this.departments.filter((department) =>
        department.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fetchDepartments();
    }
  }
}
