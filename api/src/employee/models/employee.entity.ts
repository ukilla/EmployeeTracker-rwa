import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DepartmentEntity } from 'src/department/models/department.entity';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'simple-array', nullable: true })
  overtimeDate: Date[] | null;

  @Column({ type: 'simple-array', nullable: true })
  dutyDate: Date[] | null;

  @Column({ type: 'simple-array', nullable: true })
  vacationDate: Date[] | null;

  @Column({ type: 'simple-array', nullable: true })
  takenLeaveDate: Date[] | null;

  @Column({ type: 'int', nullable: true })
  overtimeHours: number | null;

  @ManyToOne(() => DepartmentEntity, (department) => department.employees)
  department: DepartmentEntity;
}
