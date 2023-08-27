import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}
  @Input() employeeId: number = -1;
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() overtimeDates: Date[] = [];
  @Input() takenLeaveDates: Date[] = [];
  @Input() vacationDates: Date[] = [];
  @Input() dutyDates: Date[] = [];
  @Input() overtimeHours: number = 0;
  @Input() serviceOfferings: { date: string; numberOfServices: number }[] = [];
  overtimeDateCount: number = 0;
  employee: any;
  ngOnInit() {
    this.employee = {
      firstName: this.firstName,
      lastName: this.lastName,
      overtimeDate: this.overtimeDates,
      takenLeaveDates: this.takenLeaveDates,
    };
    this.overtimeDateCount = this.overtimeDates?.length;
  }

  onDeleteButtonClick(): void {
    this.employeeService
          .deleteEmployee(this.employeeId)
          .subscribe(
            (response) => {
              console.log('API response:', response);
            },
            (error) => {
              console.error('API error:', error);
            }
          );
  }
}
