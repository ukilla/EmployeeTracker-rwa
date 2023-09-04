import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  TemplateRef,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Employee } from '../models/employee';
import { DateService } from 'src/services/date.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  parseISO,
} from 'date-fns';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as EmployeeActions from '../store/actions/employee.action';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;
  @Input() employeeId: number = -1;
  @Input() dutyDates: Date[] = [];
  @Input() vacationDates: Date[] = [];
  @Input() overtimeDates: { overtimeDate: string; overtimeHours: number }[] =
    [];
  @Input() takenLeaveDates: Date[] = [];
  @Input() serviceOfferings: { date: string; numberOfServices: number }[] = [];
  selectedDate: string = '';
  overtimeSelected: boolean = false;
  serviceOfferSelected: boolean = false;
  numberOfServices: number = 0;
  activeDayIsOpen: boolean = false;
  overtimeHours: number = 0;
  refresh = new Subject<void>();
  selectedEvent: any;
  eventType: string[] = [
    'Dezurstvo',
    'Slobodan dan',
    'Godisnji odmor',
    'Usluge',
    'Prekovremeni rad',
  ];
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  public setDate: Date = new Date();
  public selected: any;
  public viewDate = new Date();
  events: CalendarEvent[] = [];

  constructor(
    private dateService: DateService,
    private cdr: ChangeDetectorRef,
    private modal: NgbModal,
    private store: Store
  ) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  modalData: {
    action: string;
    event: CalendarEvent;
  } = { action: '', event: {} as CalendarEvent };

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.selected = event.start;
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  onSelectChange() {
    if (this.selectedEvent == 'Prekovremeni rad') {
      this.overtimeSelected = true;
      this.serviceOfferSelected = false;
    } else if (this.selectedEvent == 'Usluge') {
      this.serviceOfferSelected = true;
      this.overtimeSelected = false;
    } else {
      this.overtimeSelected = false;
      this.serviceOfferSelected = false;
    }
  }

  addEvent(): void {
    if (this.selectedEvent == 'Dezurstvo') {
      this.events = [
        ...this.events,
        {
          title: 'Dezurstvo',
          start: startOfDay(parseISO(this.selected)),
          end: endOfDay(parseISO(this.selected)),
          color: { primary: 'green', secondary: 'red' },
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
      this.store.dispatch(
        EmployeeActions.addDutyDate({
          employeeId: this.employeeId,
          date: this.parseDateStringToISO8601(this.selected),
        })
      );
    }
    if (this.selectedEvent == 'Slobodan dan') {
      this.events = [
        ...this.events,
        {
          title: 'Slobodan dan',
          start: startOfDay(parseISO(this.selected)),
          end: endOfDay(parseISO(this.selected)),
          color: { primary: 'red', secondary: 'red' },
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
      this.store.dispatch(
        EmployeeActions.addTakenLeave({
          employeeId: this.employeeId,
          date: this.parseDateStringToISO8601(this.selected),
        })
      );
    }
    if (this.selectedEvent == 'Godisnji odmor') {
      this.events = [
        ...this.events,
        {
          title: 'Godisnji odmor',
          start: startOfDay(parseISO(this.selected)),
          end: endOfDay(parseISO(this.selected)),
          color: { primary: 'orange', secondary: 'red' },
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
      this.store.dispatch(
        EmployeeActions.addVacationDate({
          employeeId: this.employeeId,
          date: this.parseDateStringToISO8601(this.selected),
        })
      );
    }
    if (this.selectedEvent == 'Prekovremeni rad') {
      this.events = [
        ...this.events,
        {
          title: 'Prekovremeni rad',
          start: startOfDay(parseISO(this.selected)),
          end: endOfDay(parseISO(this.selected)),
          color: { primary: 'blue', secondary: 'red' },
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
      this.store.dispatch(
        EmployeeActions.addOvertime({
          employeeId: this.employeeId,
          date: this.parseDateStringToISO8601(this.selected),
          overtimeHours: this.overtimeHours,
        })
      );
    }
    if (this.selectedEvent == 'Usluge') {
      this.events = [
        ...this.events,
        {
          title: 'Usluge',
          start: startOfDay(parseISO(this.selected)),
          end: endOfDay(parseISO(this.selected)),
          color: { primary: '#9e13a1', secondary: 'red' },
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
      this.store.dispatch(
        EmployeeActions.addServiceOfferings({
          employeeId: this.employeeId,
          date: this.parseDateStringToISO8601(this.selected),
          numberOfServiceOfferings: this.numberOfServices,
        })
      );
    }
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  handleDelete(event: any) {
    const eventJsonOut = JSON.parse(JSON.stringify(event));
    const { start } = eventJsonOut;
    if (event.title.toString().includes('Prekovremeni rad')) {
      this.events = this.events.filter((event) => {
        const eventJson = JSON.parse(JSON.stringify(event));
        const startParsed = eventJson.start;
        return !(start == startParsed && eventJsonOut.title == eventJson.title);
      });
      this.store.dispatch(
        EmployeeActions.deleteOvertime({ employeeId: this.employeeId, start })
      );
      this.modal.dismissAll();
    }
    if (event.title.toString().includes('Godisnji odmor')) {
      this.events = this.events.filter((event) => {
        const eventJson = JSON.parse(JSON.stringify(event));
        const startParsed = eventJson.start;
        return !(start == startParsed && eventJsonOut.title == eventJson.title);
      });
      this.store.dispatch(
        EmployeeActions.deleteVacationDate({
          employeeId: this.employeeId,
          start,
        })
      );
      this.modal.dismissAll();
    }
    if (event.title.toString().includes('Broj usluga')) {
      this.events = this.events.filter((event) => {
        const eventJson = JSON.parse(JSON.stringify(event));
        const startParsed = eventJson.start;
        return !(start == startParsed && eventJsonOut.title == eventJson.title);
      });
      this.store.dispatch(
        EmployeeActions.deleteServiceOffering({
          employeeId: this.employeeId,
          start,
        })
      );
      this.modal.dismissAll();
    }
    if (event.title.toString().includes('Dezurstvo')) {
      this.events = this.events.filter((event) => {
        const eventJson = JSON.parse(JSON.stringify(event));
        const startParsed = eventJson.start;
        return !(start == startParsed && eventJsonOut.title == eventJson.title);
      });
      this.store.dispatch(
        EmployeeActions.deleteDutyDate({
          employeeId: this.employeeId,
          start,
        })
      );
      this.modal.dismissAll();
    }
    if (event.title.toString().includes('Slobodan dan')) {
      this.events = this.events.filter((event) => {
        const eventJson = JSON.parse(JSON.stringify(event));
        const startParsed = eventJson.start;
        return !(start == startParsed && eventJsonOut.title == eventJson.title);
      });
      this.store.dispatch(
        EmployeeActions.deleteTakenLeave({
          employeeId: this.employeeId,
          start,
        })
      );
      this.modal.dismissAll();
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  onDateSelected() {}

  parseDateStringToISO8601(dateString: string): string {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        const isoString = new Date(
          Date.UTC(year, month - 1, day, 0, 0, 0, 0)
        ).toISOString();
        return isoString;
      }
    }

    return '';
  }

  ngOnInit(): void {
    if (this.dutyDates) {
      this.dutyDates.map((date, index) => {
        const newColor = {
          primary: 'green',
          secondary: 'red',
        };
        const newEvent: CalendarEvent = {
          start: new Date(date.toString()),
          color: newColor,
          title: 'Dezurstvo',
        };
        this.events.push(newEvent);
      });
    }
    if (this.overtimeDates) {
      for (const key in this.overtimeDates) {
        if (this.overtimeDates.hasOwnProperty(key)) {
          const date = key.toString();
          const newColor = {
            primary: 'blue',
            secondary: 'red',
          };
          const newEvent: CalendarEvent = {
            start: new Date(date.toString()),
            color: newColor,
            title: `Prekovremeni rad ${this.overtimeDates[key]}h`,
          };
          this.events.push(newEvent);
        }
      }
    }
    if (this.vacationDates) {
      this.vacationDates.map((date, index) => {
        const newColor = {
          primary: 'orange',
          secondary: 'red',
        };
        const newEvent: CalendarEvent = {
          start: new Date(date.toString()),
          color: newColor,
          title: 'Godisnji odmor',
        };
        this.events.push(newEvent);
      });
    }
    if (this.takenLeaveDates) {
      this.takenLeaveDates.map((date, index) => {
        const newColor = {
          primary: 'red',
          secondary: 'red',
        };
        const newEvent: CalendarEvent = {
          start: new Date(date.toString()),
          color: newColor,
          title: 'Slobodan dan',
        };
        this.events.push(newEvent);
      });
    }
    if (this.serviceOfferings) {
      for (const key in this.serviceOfferings) {
        if (this.serviceOfferings.hasOwnProperty(key)) {
          const date = this.serviceOfferings[key];
          const newColor = {
            primary: '#9e13a1',
            secondary: 'red',
          };
          const newEvent: CalendarEvent = {
            start: new Date(date.toString()),
            color: newColor,
            title: `Broj usluga: ${key}  `,
          };
          this.events.push(newEvent);
        }
      }
    }
  }
}
