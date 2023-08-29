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
  @Input() overtimeDates: { overtimeDate: string; overtimeHours: number }[] = [];
  @Input() takenLeaveDates: Date[] = [];
  @Input() serviceOfferings: { date: string; numberOfServices: number }[] = [];
  selectedDate: string = '';
  numberOfServices: string | undefined = '';
  overtimeHours: number | undefined = 0;
  

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
      if (Subject.toLowerCase().includes('dezurstvo')) {
        const dutyDateString = this.parseDateStringToISO8601(startTime);
        this.dateService.addDutyDate(this.employeeId, dutyDateString).subscribe(
          (response) => {
            console.log('API response:', response);
          },
          (error) => {
            console.error('API error:', error);
          }
        );
      } else if (Subject.toLowerCase().includes('godisnji odmor')) {
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
      } else if (Subject.toLowerCase().includes('slobodan dan')) {
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
      } else if (Subject.toLowerCase().includes('prekovremeni rad')) {
        const overtimeDate = this.parseDateStringToISO8601(startTime);
        const overtimeHours = parseInt(args.data?.at(0).Location, 10);
        this.dateService
          .addOvertime(this.employeeId, overtimeDate, overtimeHours)
          .subscribe(
            (response) => {
              console.log('API response:', response);
            },
            (error) => {
              console.error('API error:', error);
            }
          );
      } else if (
        Subject.toLowerCase().includes('usluga') ||
        Subject.toLowerCase().includes('usluge')
      ) {
        const date = this.parseDateStringToISO8601(startTime);
        const numberOfServices = parseInt(args.data?.at(0).Location, 10);
        this.dateService
          .addServiceOfferings(this.employeeId, date, numberOfServices)
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

  removeTimeFromDate(dateString: string): string {
    const modifiedDateString = dateString.split('T')[0] + 'T00:00:00.000Z';
    return modifiedDateString;
  }

  findNumberOfServices(dateToFind: any) {
    for (const key in this.serviceOfferings) {
      const checkOverlap = this.serviceOfferings[key];
      if (checkOverlap == dateToFind) {
        return key;
      }
    }
    return undefined;
  }

  findNumberOfHoursOvertime(dateToFind: any) {
    for (const key in this.overtimeDates) {
      const checkOverlap = key.toString();
      const overtimeHours=parseInt(this.overtimeDates[key].toString());
      if (checkOverlap == dateToFind) {
        return overtimeHours;
      }
    }
    return undefined;
  }

  onCellClick(args: any): void {
    const { startTime } = args;
    this.selectedDate = this.parseDateStringToISO8601(startTime.toString());
    this.numberOfServices = this.findNumberOfServices(this.selectedDate);
    this.overtimeHours = this.findNumberOfHoursOvertime(this.selectedDate);
  }
  parseDateStringToISO8601(dateString: string): string {
    const parts = dateString.split(' ');

    if (parts.length < 6) {
      return '';
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
    }

    if (args.requestType === 'eventRemove') {
      const { Subject, StartTime, EndTime } = args.data?.at(0);
      console.log(args.data?.at(0));
      const startTime: string = StartTime.toString();
      const endTime: string = EndTime.toString();
      if (Subject == 'Dezurstvo') {
        const dutyDateDeleteString = this.parseDateStringToISO8601(startTime);
        const dutyDateDelete = this.removeTimeFromDate(dutyDateDeleteString);
        this.dateService
          .deleteDutyDate(this.employeeId, dutyDateDelete)
          .subscribe(
            (response) => {
              console.log('API response:', response);
            },
            (error) => {
              console.error('API error:', error);
            }
          );
      } else if (Subject == 'Godisnji odmor') {
        const vacationDateString = this.parseDateStringToISO8601(startTime);
        const vacationDateDelete = this.removeTimeFromDate(vacationDateString);
        this.dateService
          .deleteVacationDate(this.employeeId, vacationDateDelete)
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
        const takenLeaveDateDelete = this.removeTimeFromDate(takenLeaveString);
        this.dateService
          .deleteTakenLeaveDate(this.employeeId, takenLeaveDateDelete)
          .subscribe(
            (response) => {
              console.log('API response:', response);
            },
            (error) => {
              console.error('API error:', error);
            }
          );
      } else if (Subject == 'Usluge') {
        const dateString = this.parseDateStringToISO8601(endTime);
        const date = this.removeTimeFromDate(dateString);
        this.dateService.deleteServiceOffering(this.employeeId, date).subscribe(
          (response) => {
            console.log('API response:', response);
          },
          (error) => {
            console.error('API error:', error);
          }
        );
      }
      else if (Subject == 'Prekovremeni rad') {
        const dateString = this.parseDateStringToISO8601(endTime);
        const date = this.removeTimeFromDate(dateString);
        this.dateService.deleteOvertime(this.employeeId, date).subscribe(
          (response) => {
            console.log('API response:', response);
          },
          (error) => {
            console.error('API error:', error);
          }
        );
      }
    }
    this.cdr.detectChanges();
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
      const processedOvertimeDates = [];

      for (const key in this.overtimeDates) {
        if (this.overtimeDates.hasOwnProperty(key)) {
          const date = key.toString();
          const processedOffering: any = {
            Id: processedOvertimeDates.length + 1,
            Subject: 'Prekovremeni rad',
            StartTime: date,
            EndTime: date,
            IsAllDay: true,
            IsBlock: false,
            IsReadonly: false,
            RoomId: processedOvertimeDates.length + 1,
            ResourceId: processedOvertimeDates.length + 1,
          };
          processedOvertimeDates.push(processedOffering);
        }
      }

      if (Array.isArray(this.eventSettings.dataSource)) {
        this.eventSettings.dataSource = [
          ...this.eventSettings.dataSource,
          ...processedOvertimeDates,
        ];
      } else {
        this.eventSettings.dataSource = [...processedOvertimeDates];
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
    if (this.serviceOfferings) {
      const processedServiceOfferings = [];

      for (const key in this.serviceOfferings) {
        if (this.serviceOfferings.hasOwnProperty(key)) {
          const date = this.serviceOfferings[key];
          const processedOffering: any = {
            Id: processedServiceOfferings.length + 1,
            Subject: 'Usluge',
            StartTime: date,
            EndTime: date,
            IsAllDay: true,
            IsBlock: false,
            IsReadonly: false,
            RoomId: processedServiceOfferings.length + 1,
            ResourceId: processedServiceOfferings.length + 1,
          };
          processedServiceOfferings.push(processedOffering);
        }
      }

      if (Array.isArray(this.eventSettings.dataSource)) {
        this.eventSettings.dataSource = [
          ...this.eventSettings.dataSource,
          ...processedServiceOfferings,
        ];
      } else {
        this.eventSettings.dataSource = [...processedServiceOfferings];
      }
    }
  }
}
