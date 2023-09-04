import { EntityState } from "@ngrx/entity";
import { Department } from "./department";
import { Employee } from "./employee";

export interface DepartmentStateInterface extends EntityState<Department> {
    loading: boolean;
    departments: Department[];
    error: string | null;
  }