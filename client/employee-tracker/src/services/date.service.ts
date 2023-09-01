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
    console.log(dutyDate);
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

  addOvertime(employeeId: number, overtimeDate: string, overtimeHours: number) {
    const data = {
      employeeId,
      overtimeDate: overtimeDate,
      overtimeHours: overtimeHours,
    };
    console.log(data);
    return this.http.put<EmployeeDate>(
      `${this.apiUrl}/employee/addOvertime`,
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

  deleteDutyDate(employeeId: number, dutyDateDelete: string) {
    const data = { employeeId: employeeId, dutyDateDelete: dutyDateDelete };
    console.log(data);
    return this.http.put<Employee>(
      `${this.apiUrl}/employee/deleteDutyDate`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  deleteServiceOffering(employeeId: number, date: string) {
    const data = { employeeId: employeeId, date: date };
    return this.http.post<Employee>(
      `${this.apiUrl}/employee/deleteServiceOffering`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  deleteVacationDate(employeeId: number, vacationDateDelete: string) {
    const data = {
      employeeId: employeeId,
      vacationDateDelete: vacationDateDelete,
    };
    return this.http.put<Employee>(
      `${this.apiUrl}/employee/deleteVacationDate`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  deleteOvertime(employeeId: number, date: string) {
    const data = { employeeId: employeeId, date: date };
    return this.http.put<Employee>(
      `${this.apiUrl}/employee/deleteOvertime`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  deleteTakenLeaveDate(employeeId: number, takenLeaveDateDelete: string) {
    const data = {
      employeeId: employeeId,
      takenLeaveDateDelete: takenLeaveDateDelete,
    };
    return this.http.put<Employee>(
      `${this.apiUrl}/employee/deleteTakenLeaveDate`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  addServiceOfferings(
    employeeId: number,
    date: string,
    numberOfServices: number
  ) {
    const data = { employeeId, date: date, numberOfServices: numberOfServices };
    return this.http.put<EmployeeDate>(
      `${this.apiUrl}/employee/addServiceOffering`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  getServiceOfferingsForDate(
    employeeId: number,
    date: string
  ): Observable<Date[]> {
    const employeeData = { employeeId, date };
    return this.http.put<Date[]>(
      `${this.apiUrl}/employee/getServiceOfferings`,
      employeeData,
      {
        withCredentials: true,
      }
    );
  }
}
