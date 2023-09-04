import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/services/employee.service';
import { OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { selectEmployees } from '../store/selectors/employee.selector';
import { getEmployees } from '../store/actions/employee.action';
import { addEmployee } from '../store/actions/employee.action';
import { EmployeeStateInterface } from '../models/employee.state';
import { User } from '../models/user';
import { selectUserFeature } from '../store/selectors/user.selectors';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  showForm = false;
  departments: any[] = [];
  employee: any = {};
  employeesStore: any[] = [];
  searchTerm = '';
  filteredEmployees: any[] = [];
  employees$ = this.store.select(selectEmployees);
  authenticated = true;
  user!: User | null;
  isLoggedIn!: boolean;
  searchEmployees() {
    this.filteredEmployees = this.employeesStore.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      return fullName.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  ngOnInit() {
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
    this.store.dispatch(getEmployees());
    this.store.select(selectEmployees).subscribe((employees) => {
      this.employeesStore = employees;
    });
  }

  constructor(
    private employeeService: EmployeeService,
    private store: Store<EmployeeStateInterface>
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const selectedDepartmentId = this.employee.department;

      const selectedDepartment = this.departments.find(
        (dept) => dept.id === selectedDepartmentId
      );

      this.employee.departmentId = selectedDepartmentId;
      this.employee.firstName = form.value.firstName;
      this.employee.lastName = form.value.lastName;
      this.store.dispatch(addEmployee({ employee: this.employee }));
        form.resetForm();
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
}
