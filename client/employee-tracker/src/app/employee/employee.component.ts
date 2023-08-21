import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @Input() firstName: string="";
  @Input() lastName: string="";
  @Input() overtimeDates: Date[]=[];
  @Input() takenLeaveDates: Date[]=[];
  @Input() vacationDates: Date[]=[];
  @Input() dutyDates: Date[]=[];
  employee:any;
  ngOnInit(){
    this.employee={firstName: this.firstName,lastName: this.lastName,overtimeDate:this.overtimeDates,takenLeaveDates:this.takenLeaveDates}
  }
}
