import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Employee } from '../models/employee';
import {
  DateRangeDescriptor,
  DateRangeType,
  IgxCalendarComponent,
  IgxDialogComponent,
} from 'igniteui-angular';
import { DateService } from 'src/services/date.service';
import { View } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @Input() dutyDates: Date[] = [];
  @Input() vacationDates: Date[] = [];
  @Input() overtimeDates: Date[] = [];
  @Input() takenLeaveDates: Date[] = [];
  @Input() overtimeHours: number = 0;

  public today = new Date(Date.now());

  public setView: View = 'Month';

  public eventSettings: any = {
    dataSource: [],
  };

  constructor(
    private dateService: DateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.dutyDates) {
      console.log(this.dutyDates);
      const events = this.dutyDates.map((date) => ({
        id: 'event_' + date,
        subject: 'Dezurstvo',
        startTime: new Date(date),
        endTime: new Date(date),
      }));
      this.eventSettings.dataSource = events;
    }
  }
}
