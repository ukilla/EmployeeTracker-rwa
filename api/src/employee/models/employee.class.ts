import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DepartmentEntity } from 'src/department/models/department.entity';

export class Employee {

  firstName: string;
  lastName: string;
  departmentId: number;
}
