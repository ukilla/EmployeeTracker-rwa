import { createAction, props } from '@ngrx/store';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';

export const fetchDepartments = createAction('[Department] Fetch Departments');
export const fetchDepartmentsSuccess = createAction(
  '[Department] Fetch Departments Success',
  props<{ departments: Department[] }>()
);
export const fetchDepartmentsFailure = createAction(
  '[Department] Fetch Departments Failure',
  props<{ error: any }>()
);
export const loadEmployees = createAction(
  '[Department] Load Employees',
  props<{ departmentId: number }>()
);

export const loadEmployeesSuccess = createAction(
  '[Department] Load Employees success',
  props<{ employees: Employee[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Department] Load Employees failure',
  props<{ message: string }>()
);
