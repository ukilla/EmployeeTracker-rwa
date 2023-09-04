import { EmployeeStateInterface } from 'src/app/models/employee.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectEmployeeState = createFeatureSelector<EmployeeStateInterface>('employee');

export const selectEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeStateInterface) => state.employees
);

export const selectLoading = createSelector(
  selectEmployeeState,
  (state: EmployeeStateInterface) => state.loading
);

export const selectError = createSelector(
  selectEmployeeState,
  (state: EmployeeStateInterface) => state.error
);


