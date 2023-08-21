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
export class DateService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  addDutyDate(employeeId: number, dutyDate: Date[]) {
    const employeeData = { employeeId, dutyDate };
    return this.http.post<Employee>(
      `${this.apiUrl}/employee/addDutyDate`,
      employeeData,
      {
        withCredentials: true,
      }
    );
  }
  getDutyDate(employeeId: number): Observable<Date[]> {
    const employeeData = { employeeId };
    return this.http.get<Date[]>( 
      `${this.apiUrl}/employee/getDutyDate`,
      {
        params: employeeData,
        withCredentials: true,
      }
    );
  }
}
