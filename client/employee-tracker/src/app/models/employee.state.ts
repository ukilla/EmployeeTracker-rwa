import { Employee } from '../models/employee';
import { EntityState } from '@ngrx/entity';

export interface EmployeeStateInterface extends EntityState<Employee> {
  loading: boolean;
  employees: Employee[];
  error: string | null;
}
