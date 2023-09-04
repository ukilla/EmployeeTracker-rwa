import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import * as EmployeeActions from '../actions/employee.action';
import { of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { DateService } from 'src/services/date.service';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private router: Router,
    private dateService: DateService
  ) {}
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.getEmployees),
      switchMap(() =>
        this.employeeService.getEmployees().pipe(
          map((employees) =>
            EmployeeActions.getEmployeesSuccess({ employees })
          ),
          catchError((error) =>
            of(EmployeeActions.getEmployeesFailure({ error }))
          )
        )
      )
    )
  );
  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),
      mergeMap((action) =>
        this.employeeService
          .addEmployee(
            action.employee.firstName,
            action.employee.lastName,
            action.employee.department
          )
          .pipe(
            map(() =>
              EmployeeActions.addEmployeeSuccess({ employee: action.employee })
            ),
            catchError((error) => of(EmployeeActions.addEmployeeFailure()))
          )
      )
    )
  );
  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      mergeMap((action) =>
        this.employeeService.deleteEmployee(action.employeeId).pipe(
          map(() =>
            EmployeeActions.deleteEmployeeSuccess({
              employeeId: action.employeeId,
            })
          ),
          catchError((error) =>
            of(EmployeeActions.deleteEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  addDutyDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addDutyDate),
      mergeMap((action) =>
        this.dateService.addDutyDate(action.employeeId, action.date).pipe(
          map((response) => EmployeeActions.addDutyDateSuccess({ response })),
          catchError((error) =>
            of(EmployeeActions.addDutyDateFailure({ error }))
          )
        )
      )
    )
  );

  addVacationDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addVacationDate),
      mergeMap((action) =>
        this.dateService.addVacationDate(action.employeeId, action.date).pipe(
          map((response) =>
            EmployeeActions.addVacationDateSuccess({ response })
          ),
          catchError((error) =>
            of(EmployeeActions.addVacationDateFailure({ error }))
          )
        )
      )
    )
  );

  addTakenLeave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addTakenLeave),
      mergeMap((action) =>
        this.dateService.addTakenLeave(action.employeeId, action.date).pipe(
          map((response) => EmployeeActions.addTakenLeaveSuccess({ response })),
          catchError((error) =>
            of(EmployeeActions.addTakenLeaveFailure({ error }))
          )
        )
      )
    )
  );

  addServiceOfferings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addServiceOfferings),
      mergeMap((action) =>
        this.dateService
          .addServiceOfferings(
            action.employeeId,
            action.date,
            action.numberOfServiceOfferings
          )
          .pipe(
            map((response) =>
              EmployeeActions.addServiceOfferingsSuccess({ response })
            ),
            catchError((error) =>
              of(EmployeeActions.addServiceOfferingsFailure({ error }))
            )
          )
      )
    )
  );

  addOvertime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addOvertime),
      mergeMap((action) =>
        this.dateService
          .addOvertime(action.employeeId, action.date, action.overtimeHours)
          .pipe(
            map((response) => EmployeeActions.addOvertimeSuccess({ response })),
            catchError((error) =>
              of(EmployeeActions.addOvertimeFailure({ error }))
            )
          )
      )
    )
  );
  deleteOvertime$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EmployeeActions.deleteOvertime),
    mergeMap((action) =>
      this.dateService.deleteOvertime(action.employeeId, action.start).pipe(
        map((response) => EmployeeActions.deleteOvertimeSuccess()),
        catchError((error) =>
          of(EmployeeActions.deleteOvertimeFailure({ error }))
        )
      )
    )
  )
);
deleteVacationDate$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EmployeeActions.deleteVacationDate),
    mergeMap((action) =>
      this.dateService.deleteVacationDate(action.employeeId, action.start).pipe(
        map((response) => EmployeeActions.deleteVacationDateSuccess()),
        catchError((error) =>
          of(EmployeeActions.deleteVacationDateFailure({ error }))
        )
      )
    )
  )
);
deleteServiceOffering$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EmployeeActions.deleteServiceOffering),
    mergeMap((action) =>
      this.dateService.deleteServiceOffering(action.employeeId, action.start).pipe(
        map((response) => EmployeeActions.deleteServiceOfferingSuccess()),
        catchError((error) =>
          of(EmployeeActions.deleteServiceOfferingFailure({ error }))
        )
      )
    )
  )
);
deleteDutyDate$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EmployeeActions.deleteDutyDate),
    mergeMap((action) =>
      this.dateService.deleteDutyDate(action.employeeId, action.start).pipe(
        map((response) => EmployeeActions.deleteDutyDateSuccess()),
        catchError((error) =>
          of(EmployeeActions.deleteDutyDateFailure({ error }))
        )
      )
    )
  )
);
deleteTakenLeave$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EmployeeActions.deleteTakenLeave),
    mergeMap((action) =>
      this.dateService.deleteTakenLeaveDate(action.employeeId, action.start).pipe(
        map((response) => EmployeeActions.deleteTakenLeaveSuccess()),
        catchError((error) =>
          of(EmployeeActions.deleteTakenLeaveFailure({ error }))
        )
      )
    )
  )
);
}
