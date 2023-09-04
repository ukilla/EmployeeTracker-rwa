import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionReducer, StoreModule } from '@ngrx/store';
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
import { EmployeeEffects } from './store/effects/employee.effects';
import { departmentReducer } from './store/reducers/department.reducer';
import { DepartmentEffects } from './store/effects/department.effects';
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
import { DateAdapter,CalendarModule } from 'angular-calendar';
import {employeeReducer} from "../app/store/reducers/employee.reducer";

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
    StoreModule.forRoot({ user: reducers }),
    StoreModule.forFeature('employee', employeeReducer),
    StoreModule.forFeature('department', departmentReducer),
    EffectsModule.forFeature([EmployeeEffects]), 
    EffectsModule.forFeature([DepartmentEffects]), 
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    CalendarModule.forRoot({ provide: DateAdapter,
      useFactory: adapterFactory,}),
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
