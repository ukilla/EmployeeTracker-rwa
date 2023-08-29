import { Component } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { Store, select } from '@ngrx/store';
import { UserStateInterface } from '../models/user.state';
import { selectUserFeature } from '../store/selectors/user.selectors';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  authenticated = true;
  user!: User | null;
  isLoggedIn!: boolean;
  employees: any[] = [];
  totalTakenLeaveDatesInLastWeek: number=0;
  totalVacationDateInLastMonth: number = 0;
  totalServiceOfferingsInLast2Days: number = 0;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private store: Store<UserStateInterface>,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    this.fetchEmployees();
  }

  calculateStatistics() {
    const currentDate = new Date();
    const lastDay = new Date(currentDate);
    lastDay.setDate(lastDay.getDate() - 1);
    const last2Days = new Date(currentDate);
    last2Days.setDate(last2Days.getDate() - 2);
    const last7Days = new Date(currentDate);
    last7Days.setDate(last7Days.getDate() - 7);
    const lastMonth = new Date(currentDate);
    lastMonth.setDate(lastMonth.getDate() - 30);

    this.employees.forEach((employee) => {
      const serviceOfferings = employee.serviceOfferings;
      for (const key in serviceOfferings) {
        const serviceDate = new Date(serviceOfferings[key]);
        if (serviceDate >= last2Days) {
          this.totalServiceOfferingsInLast2Days += parseInt(key);
        }
      }
      if (employee.takenLeaveDate) {
        const takenLeaveDatesInLastWeek = employee.takenLeaveDate.filter(
          (date: string) => {
            const takenLeaveDate = new Date(date);
            return takenLeaveDate >= last7Days;
          }
        ).length;
        this.totalTakenLeaveDatesInLastWeek += takenLeaveDatesInLastWeek;
      }
      if (employee.vacationDate) {
        const totalVacationDateInLastMonth = employee.vacationDate.filter(
          (date: string) => {
            const vacationDate = new Date(date);
            return vacationDate >= lastMonth;
          }
        ).length;
        this.totalVacationDateInLastMonth += totalVacationDateInLastMonth;
      }
    });
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data: any) => {
        this.employees = data;
        console.log(data);
        this.calculateStatistics();
      },
      (error: any) => {
        console.error('Error fetching employee:', error);
      }
    );
  }
  employeesRedirect(){
    this.router.navigate(['/employees']);
  }
}
