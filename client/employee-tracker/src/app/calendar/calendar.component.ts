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
import { DateService } from 'src/services/date.service';
import {
  ActionEventArgs,
  EventSettingsModel,
  PopupOpenEventArgs,
  View,
} from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @Input() employeeId: number = -1;
  @Input() dutyDates: Date[] = [];
  @Input() vacationDates: Date[] = [];
  @Input() overtimeDates: Date[] = [];
  @Input() takenLeaveDates: Date[] = [];
  @Input() overtimeHours: number = 0;

  private dataManager: DataManager = new DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/Schedule',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
  });
  public eventSettings: EventSettingsModel = {
    dataSource: [],
  };

  public setView: View = 'Month';

  public setDate: Date = new Date();

  constructor(
    private dateService: DateService,
    private cdr: ChangeDetectorRef
  ) {}

  onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreated') {
      const { Subject, StartTime } = args.data?.at(0);
      const startTime: string = StartTime.toString();
      if (Subject == 'Dezurstvo') {
        const dutyDateString = this.parseDateStringToISO8601(startTime);
        console.log(`${dutyDateString}`);
        this.dateService.addDutyDate(this.employeeId, dutyDateString).subscribe(
          (response) => {
            console.log('API response:', response);
          },
          (error) => {
            console.error('API error:', error);
          }
        );
      } else if (Subject == 'Godisnji odmor') {
        const vacationDateString = this.parseDateStringToISO8601(startTime);
        this.dateService
          .addVacationDate(this.employeeId, vacationDateString)
          .subscribe(
            (response) => {
              console.log('API response:', response);
            },
            (error) => {
              console.error('API error:', error);
            }
          );
      } else if (Subject == 'Slobodan dan') {
        const takenLeaveString = this.parseDateStringToISO8601(startTime);
        this.dateService
          .addTakenLeave(this.employeeId, takenLeaveString)
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
  }

  parseDateStringToISO8601(dateString: string): string {
    const parts = dateString.split(' ');

    if (parts.length < 6) {
      return ''; // Invalid format
    }

    const day = parts[2];
    const monthStr = parts[1];
    const year = parts[3];
    const time = parts[4];

    const offset = parts.slice(5).join(' ');

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = months.indexOf(monthStr);

    if (month !== -1) {
      const isoString = new Date(
        Date.UTC(
          Number(year),
          month,
          Number(day),
          ...time.split(':').map(Number)
        )
      ).toISOString();
      return isoString;
    }

    return '';
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'QuickInfo') {
    }
  }

  onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreate') {
      //const inputElement = args.element.querySelector('input[type="number"]');
      //const customNumber = inputElement ? parseInt(inputElement.value, 10) : 0;
      // Now you can pass the customNumber to your function
      // this.dateService.addEventWithCustomNumber(args.data, customNumber);
    }
  }

  ngOnInit(): void {
    if (this.dutyDates) {
      const processedEvents = this.dutyDates.map((date, index) => ({
        Id: index + 1,
        Subject: 'Dezurstvo',
        StartTime: date,
        EndTime: date,
        IsAllDay: true,
        IsBlock: false,
        IsReadonly: false,
        RoomId: index + 1,
        ResourceId: index + 1,
      }));
      if (Array.isArray(this.eventSettings.dataSource)) {
        this.eventSettings.dataSource = [
          ...this.eventSettings.dataSource,
          ...processedEvents,
        ];
      } else {
        this.eventSettings.dataSource = [...processedEvents];
      }
    }
    if (this.overtimeDates) {
      const processedEvents = this.overtimeDates.map((date, index) => ({
        Id: index + 1,
        Subject: 'Prekovremeni rad',
        StartTime: date,
        EndTime: date,
        IsAllDay: true,
        IsBlock: false,
        IsReadonly: false,
        RoomId: index + 1,
        ResourceId: index + 1,
      }));
      if (Array.isArray(this.eventSettings.dataSource)) {
        this.eventSettings.dataSource = [
          ...this.eventSettings.dataSource,
          ...processedEvents,
        ];
      } else {
        this.eventSettings.dataSource = [...processedEvents];
      }
    }
    if (this.vacationDates) {
      const processedEvents = this.vacationDates.map((date, index) => ({
        Id: index + 1,
        Subject: 'Godisnji odmor',
        StartTime: date,
        EndTime: date,
        IsAllDay: true,
        IsBlock: false,
        IsReadonly: false,
        RoomId: index + 1,
        ResourceId: index + 1,
      }));
      if (Array.isArray(this.eventSettings.dataSource)) {
        this.eventSettings.dataSource = [
          ...this.eventSettings.dataSource,
          ...processedEvents,
        ];
      } else {
        this.eventSettings.dataSource = [...processedEvents];
      }
    }
    if (this.takenLeaveDates) {
      const processedEvents = this.takenLeaveDates.map((date, index) => ({
        Id: index + 1,
        Subject: 'Slobodan dan',
        StartTime: date,
        EndTime: date,
        IsAllDay: true,
        IsBlock: false,
        IsReadonly: false,
        RoomId: index + 1,
        ResourceId: index + 1,
      }));
      if (Array.isArray(this.eventSettings.dataSource)) {
        this.eventSettings.dataSource = [
          ...this.eventSettings.dataSource,
          ...processedEvents,
        ];
      } else {
        this.eventSettings.dataSource = [...processedEvents];
      }
    }
  }
}
