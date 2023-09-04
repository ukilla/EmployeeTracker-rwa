import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import * as AuthActions from '../app/store/actions/user.action';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  addEmployee(
    firstName: string,
    lastName: string,
    departmentId: number
  ): Observable<Employee> {
    const employeeData = { firstName, lastName, departmentId };
    return this.http.post<Employee>(
      `${this.apiUrl}/employee/addEmployee`,
      employeeData,
      {
        withCredentials: true,
      }
    );
  }
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(
      `${this.apiUrl}/department/getDepartments`,
      {
        withCredentials: true,
      }
    );
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/getEmployees`, {
      withCredentials: true,
    });
  }

  employeesFromDepartment(index: number) {
    const data = { departmentId: index };
    return this.http.put<Employee>(
      `${this.apiUrl}/employee/byDepartment`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  deleteEmployee(employeeId: number) {
    const data = { employeeId: employeeId };
    return this.http.post<Employee>(
      `${this.apiUrl}/employee/deleteEmployee`,
      data,
      {
        withCredentials: true,
      }
    );
  }
}
