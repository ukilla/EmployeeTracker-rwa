import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/app/models/employee';

export const getEmployees = createAction('[Employee] Get employee');
export const getEmployeesSuccess = createAction(
  '[Employee] Get employee success',
  props<{
    employees: Employee[];
  }>()
);

export const getEmployeesFailure = createAction(
  '[Employee] Getting employees failure',
  props<{ error: string }>()
);
export const addEmployee = createAction(
  '[Employee] Add employee',
  props<{ employee: Employee }>()
);
export const addEmployeeSuccess = createAction(
  '[Employee] Add employee success',
  props<{ employee: Employee }>()
);

export const addEmployeeFailure = createAction(
  '[Employee] Adding employee failure'
);

export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  props<{ employeeId: number }>()
);

export const deleteEmployeeSuccess = createAction(
  '[Employee] Delete Employee Success',
  props<{ employeeId: number }>()
);

export const deleteEmployeeFailure = createAction(
  '[Employee] Delete Employee Failure',
  props<{ error: string }>()
);

export const addDutyDate = createAction(
  '[Employee] Add Duty Date',
  props<{ employeeId: number; date: string }>()
);

export const addDutyDateSuccess = createAction(
  '[Employee] Add Duty Date Success',
  props<{ response: any }>()
);

export const addDutyDateFailure = createAction(
  '[Employee] Add Duty Date Failure',
  props<{ error: any }>()
);

export const addVacationDate = createAction(
  '[Employee] Add Vacation Date',
  props<{ employeeId: number; date: string }>()
);

export const addVacationDateSuccess = createAction(
  '[Employee] Add Vacation Date Success',
  props<{ response: any }>()
);

export const addVacationDateFailure = createAction(
  '[Employee] Add Vacation Date Failure',
  props<{ error: any }>()
);

export const addTakenLeave = createAction(
  '[Employee] Add Taken Leave Date',
  props<{ employeeId: number; date: string }>()
);

export const addTakenLeaveSuccess = createAction(
  '[Employee] Add Taken Leave Date Success',
  props<{ response: any }>()
);

export const addTakenLeaveFailure = createAction(
  '[Employee] Add Taken Leave Date Failure',
  props<{ error: any }>()
);

export const addServiceOfferings = createAction(
  '[Employee] Add Service Offerings',
  props<{
    employeeId: number;
    date: string;
    numberOfServiceOfferings: number;
  }>()
);

export const addServiceOfferingsSuccess = createAction(
  '[Employee] Add Service Offerings Success',
  props<{ response: any }>()
);

export const addServiceOfferingsFailure = createAction(
  '[Employee] Add Service Offerings Failure',
  props<{ error: any }>()
);

export const addOvertime = createAction(
  '[Employee] Add Overtime',
  props<{
    employeeId: number;
    date: string;
    overtimeHours: number;
  }>()
);

export const addOvertimeSuccess = createAction(
  '[Employee] Add Overtime Success',
  props<{ response: any }>()
);

export const addOvertimeFailure = createAction(
  '[Employee] Add Overtime Failure',
  props<{ error: any }>()
);

export const deleteOvertime = createAction(
  '[Employee] Delete Overtime',
  props<{ employeeId: number; start: string }>()
);

export const deleteOvertimeSuccess = createAction(
  '[Employee] Delete Overtime Success'
);

export const deleteOvertimeFailure = createAction(
  '[Employee] Delete Overtime Failure',
  props<{ error: any }>()
);

export const deleteVacationDate = createAction(
  '[Employee] Delete Vacation Date',
  props<{ employeeId: number; start: string }>()
);

export const deleteVacationDateSuccess = createAction(
  '[Employee] Delete Vacation Date Success'
);

export const deleteVacationDateFailure = createAction(
  '[Employee] Delete Vacation Date Failure',
  props<{ error: any }>()
);
export const deleteServiceOffering = createAction(
  '[Employee] Delete Service Offering',
  props<{ employeeId: number; start: string }>()
);

export const deleteServiceOfferingSuccess = createAction(
  '[Employee] Delete Service Offering Success'
);

export const deleteServiceOfferingFailure = createAction(
  '[Employee] Delete Service Offering Failure',
  props<{ error: any }>()
);
export const deleteDutyDate = createAction(
  '[Employee] Delete Duty Date',
  props<{ employeeId: number; start: string }>()
);

export const deleteDutyDateSuccess = createAction(
  '[Employee] Delete Duty Date Success'
);

export const deleteDutyDateFailure = createAction(
  '[Employee] Delete Duty Date Failure',
  props<{ error: any }>()
);
export const deleteTakenLeave = createAction(
  '[Employee] Delete Taken Leave Date',
  props<{ employeeId: number; start: string }>()
);

export const deleteTakenLeaveSuccess = createAction(
  '[Employee] Delete Taken Leave Date Success'
);

export const deleteTakenLeaveFailure = createAction(
  '[Employee] Delete Taken Leave Date Failure',
  props<{ error: any }>()
);
