import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Employee } from '../models/employee';
import { DateRangeType, IgxCalendarComponent, IgxDialogComponent } from 'igniteui-angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendar', { static: true }) public calendar!: IgxCalendarComponent;
  @ViewChild('alert', { static: true }) public dialog!: IgxDialogComponent;
  public range = [];

  ngAfterViewInit(): void {
    // Now dialog is guaranteed to be initialized
    this.dialog.message = 'Initial message';
  }

  public selectPTOdays(dates: Date | Date[]) {
      //this.range = dates as Date[];
  }

  public submitPTOdays() {
      this.calendar.specialDates =
          [{ type: DateRangeType.Specific, dateRange: this.range }];

      this.range.forEach((item) => {
          this.calendar.selectDate(item);
      });

      if (this.range.length === 0) {
          this.dialog.message = 'Select dates from the Calendar first.';
      } else {
          this.dialog.message = 'PTO days submitted.';
      }
      this.dialog.open();
  }
}
