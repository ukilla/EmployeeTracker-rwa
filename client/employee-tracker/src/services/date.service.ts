import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import * as AuthActions from '../app/store/actions/user.action';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { EmployeeDate } from 'src/app/models/employee-date';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  addDutyDate(employeeId: number, dutyDate: string) {
    const data = { employeeId, dutyDate: [dutyDate] };
    return this.http.put<EmployeeDate>(
      `${this.apiUrl}/employee/addDutyDate`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  addVacationDate(employeeId: number, vacationDate: string) {
    const data = { employeeId, vacationDate: [vacationDate] };
    return this.http.put<EmployeeDate>(
      `${this.apiUrl}/employee/addVacationDate`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  
  addTakenLeave(employeeId: number, takenLeave: string) {
    const data = { employeeId, takenLeaveDate: [takenLeave] };
    return this.http.put<EmployeeDate>(
      `${this.apiUrl}/employee/addTakenLeave`,
      data,
      {
        withCredentials: true,
      }
    );
  }
  getDutyDate(employeeId: number): Observable<Date[]> {
    const employeeData = { employeeId };
    return this.http.get<Date[]>(`${this.apiUrl}/employee/getDutyDate`, {
      params: employeeData,
      withCredentials: true,
    });
  }
}
