import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as DepartmentActions from '../actions/department.action';
import { of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/services/employee.service';

@Injectable()
export class DepartmentEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private router: Router
  ) {}
  fetchDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentActions.fetchDepartments),
      mergeMap(() =>
        this.employeeService.getDepartments().pipe(
          map((departments) =>
            DepartmentActions.fetchDepartmentsSuccess({ departments }) 
          ),
          catchError((error) =>
            of(DepartmentActions.fetchDepartmentsFailure({ error }))
          )
        )
      )
    )
  );
  loadEmployees$ = createEffect(() =>
  this.actions$.pipe(
    ofType(DepartmentActions.loadEmployees),
    mergeMap((action) =>
      this.employeeService.employeesFromDepartment(action.departmentId).pipe(
        map((data: any) =>
          DepartmentActions.loadEmployeesSuccess({ employees: data })
        ),
        catchError((message) =>
          of(DepartmentActions.loadEmployeesFailure({ message }))
        )
      )
    )
  )
);
}
