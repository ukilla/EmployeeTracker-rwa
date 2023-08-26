import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/services/employee.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  showForm = false;
  departments: any[] = [];
  employee: any = {};
  employees: any[] = [];
  searchTerm = '';
  filteredEmployees: any[] = [];

  searchEmployees() {
    this.filteredEmployees = this.employees.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      return fullName.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  ngOnInit() {
    this.fetchEmployees();
  }

  constructor(private employeeService: EmployeeService) {} // Inject your API service

  onSubmit(form: NgForm) {
    if (form.valid) {
      const selectedDepartmentId = this.employee.department;

      const selectedDepartment = this.departments.find(
        (dept) => dept.id === selectedDepartmentId
      );

      this.employee.departmentId = selectedDepartmentId;
      this.employeeService
        .addEmployee(
          this.employee.firstName,
          this.employee.lastName,
          this.employee.departmentId
        )
        .subscribe(
          (response: any) => {
            console.log('Employee added successfully:', response);
            form.resetForm();
            this.showForm = false;
          },
          (error: any) => {
            console.error('Error adding employee:', error);
          }
        );
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.fetchDepartments();
    }
  }

  fetchDepartments() {
    this.employeeService.getDepartments().subscribe(
      (data: any) => {
        this.departments = data;
      },
      (error: any) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data: any) => {
        this.employees = data;
      },
      (error: any) => {
        console.error('Error fetching employee:', error);
      }
    );
  }
}
