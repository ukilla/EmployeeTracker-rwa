import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { Department } from '../models/department';
import { Employee } from '../models/employee';
import { Store } from '@ngrx/store';
import { selectDepartments } from '../store/selectors/department.selector';
import { fetchDepartments } from '../store/actions/department.action';
import { DepartmentStateInterface } from '../models/department.state';
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  constructor(private employeeService: EmployeeService, private store: Store<DepartmentStateInterface>) {}
  departments: Department[] = [];
  employees: Employee[] = [];
  searchQuery: string = '';
  ngOnInit() {
    this.store.dispatch(fetchDepartments());

    this.store.select(selectDepartments).subscribe((departments) => {
      this.departments = departments;
    });
  }

  filterDepartments() {
    if (this.searchQuery) {
      this.departments = this.departments.filter((department) =>
        department.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
    }
  }
}
