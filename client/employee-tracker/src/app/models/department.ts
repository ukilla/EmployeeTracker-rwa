import { Employee } from './employee';

export class Department {
  id: number;
  name: string;
  employees: Employee[];
  showEmployees: boolean;
  constructor(
    id: number,
    name: string,
    employees: Employee[],
    showEmployees: boolean
  ) {
    this.id = id;
    this.name = name;
    this.employees = employees;
    this.showEmployees = showEmployees;
  }
}
