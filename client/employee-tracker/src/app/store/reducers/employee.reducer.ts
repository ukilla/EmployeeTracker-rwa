import { Action, createReducer, on } from '@ngrx/store';
import * as EmployeeActions from '../actions/employee.action';
import { Employee } from 'src/app/models/employee';
import { EmployeeStateInterface } from 'src/app/models/employee.state';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
export const adapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();

export const initialState: EmployeeStateInterface = adapter.getInitialState({
  loading: false,
  error: null,
  employees: [],
});

export const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.getEmployees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.getEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loading: false,
  })),
  on(EmployeeActions.getEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeeActions.addEmployee, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    loading: false,
    error: null,
  })),
  on(EmployeeActions.addEmployeeFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(EmployeeActions.deleteEmployee, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { employeeId }) => ({
    ...state,
    employees: state.employees.filter((employee) => employee.id !== employeeId),
    loading: false,
    error: null,
  })),
  on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeeActions.addDutyDate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.addDutyDateSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(EmployeeActions.addDutyDateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeeActions.addVacationDate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.addVacationDateSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(EmployeeActions.addVacationDateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeeActions.addTakenLeave, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.addTakenLeaveSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(EmployeeActions.addTakenLeaveFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeeActions.addServiceOfferings, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.addDutyDateSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(EmployeeActions.addServiceOfferingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeeActions.addOvertime, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.addOvertimeSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(EmployeeActions.addOvertimeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeeActions.deleteOvertime, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.deleteOvertimeSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(EmployeeActions.deleteOvertimeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeeActions.deleteVacationDate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.deleteVacationDateSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(EmployeeActions.deleteVacationDateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeeActions.deleteServiceOffering, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.deleteServiceOfferingSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(EmployeeActions.deleteServiceOfferingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeeActions.deleteOvertime, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.deleteOvertimeSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(EmployeeActions.deleteOvertimeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeeActions.deleteTakenLeave, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.deleteTakenLeaveSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(EmployeeActions.deleteTakenLeaveFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
