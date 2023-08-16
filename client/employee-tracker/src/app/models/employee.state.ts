import { Employee } from '../models/employee';
import { EntityState } from '@ngrx/entity';

export interface EmployeeStateInterface extends EntityState<Employee> {
  isLoading: boolean;
  employee: Employee[];
  error: string | null;
}
