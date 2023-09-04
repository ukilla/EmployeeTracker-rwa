export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  department: number;
  overtimeDate: { overtimeDate: string; overtimeHours: number }[];
  takenLeaveDate: Date[];
  serviceOfferings:  { date: string; numberOfServices: number }[];
  dutyDate: Date[];
  vacationDate:Date[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    department: number,
    overtimeDate:  { overtimeDate: string; overtimeHours: number }[],
    takenLeaveDate: Date[],
    serviceOfferings:  { date: string; numberOfServices: number }[],
    dutyDate: Date[],
    vacationDate:Date[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.department = department;
    this.overtimeDate = overtimeDate;
    this.takenLeaveDate = takenLeaveDate;
    this.serviceOfferings = serviceOfferings;
    this.dutyDate = dutyDate;
    this.vacationDate=vacationDate;
  }
}
