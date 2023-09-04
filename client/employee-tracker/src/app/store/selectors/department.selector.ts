import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Department } from 'src/app/models/department';
import { DepartmentStateInterface } from 'src/app/models/department.state';
import { adapter } from '../reducers/department.reducer';

export const selectDepartmentState =
  createFeatureSelector<DepartmentStateInterface>('department');

export const selectDepartments = createSelector(
  selectDepartmentState,
  (state) => state.departments
);

export const selectAllDepartments = createSelector(
  selectDepartmentState,
  adapter.getSelectors().selectAll
);

export const selectLoading = createSelector(
  selectDepartmentState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectDepartmentState,
  (state) => state.error
);

export const selectDepartmentEmployees = createSelector(
  selectAllDepartments,
  (departments: any, props: any) => {
    const department = departments.find(
      (d: any) => d.id === props.departmentId
    );
    return department ? department.employees : [];
  }
);
