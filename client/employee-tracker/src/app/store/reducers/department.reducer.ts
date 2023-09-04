import { Action, createReducer, on } from '@ngrx/store';
import { Department } from 'src/app/models/department';
import * as DepartmentActions from '../actions/department.action';
import { DepartmentStateInterface } from 'src/app/models/department.state';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
export const adapter: EntityAdapter<Department> =
  createEntityAdapter<Department>();

export const initialState: DepartmentStateInterface = adapter.getInitialState({
  loading: false,
  error: null,
  departments: [],
  employees: [],
});

export const departmentReducer = createReducer(
  initialState,
  on(DepartmentActions.fetchDepartments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DepartmentActions.fetchDepartmentsSuccess, (state, { departments }) => ({
    ...state,
    departments: departments,
    loading: false,
    error: null,
  })),
  on(DepartmentActions.fetchDepartmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(DepartmentActions.loadEmployees, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(DepartmentActions.loadEmployeesSuccess, (state, { employees }) => {
    return {
      ...state,
      departments: state.departments,
      employees: employees,
    };
  }),
  on(DepartmentActions.loadEmployeesFailure, (state, {message}) => {
    return {
      ...state,
      loading:false,
      message: message,
    };
  })
);

export function reducer(
  state: DepartmentStateInterface | undefined,
  action: Action
) {
  return departmentReducer(state, action);
}
