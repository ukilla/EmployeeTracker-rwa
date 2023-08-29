import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { UserEffects } from './store/effects/user.effects';
import { reducers } from './store/reducers/user.reducers';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './employee/employee.component';
import { MatIconModule } from '@angular/material/icon';
import { CalendarComponent } from './calendar/calendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { IgxCalendarModule, IgxDialogModule } from 'igniteui-angular';
import {
  CalendarModule,
  DatePickerModule,
  TimePickerModule,
  DateRangePickerModule,
  DateTimePickerModule,
} from '@syncfusion/ej2-angular-calendars';
import {
  ScheduleModule,
  RecurrenceEditorModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  MonthAgendaService,
} from '@syncfusion/ej2-angular-schedule';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentTabComponent } from './department-tab/department-tab.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MainComponent,
    EmployeeListComponent,
    EmployeeComponent,
    CalendarComponent,
    DepartmentsComponent,
    DepartmentTabComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ user: reducers }, {}),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    IgxCalendarModule,
    IgxDialogModule,
    CalendarModule,
    DatePickerModule,
    TimePickerModule,
    DateRangePickerModule,
    DateTimePickerModule,
    ScheduleModule,
    RecurrenceEditorModule,
    NgbModule,
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
