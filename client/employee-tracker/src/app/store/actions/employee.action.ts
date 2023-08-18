import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/app/models/employee';

export const getEmployees = createAction('[Employee] Get employee');
export const addEmployee = createAction(
  '[Employee] Add employee',
  props<{ employee: Employee }>()
);
export const addEmployeeSuccess = createAction(
  '[Employee] Add employee sucess',
  props<{ employee: Employee }>()
);
