import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EmployeeEntity } from 'src/employee/models/employee.entity';

@Entity('department')
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => EmployeeEntity, employee => employee.department, { nullable: true })
  employees: EmployeeEntity[];

}
