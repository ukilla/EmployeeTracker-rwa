import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;
  constructor(
    private employeeService: EmployeeService,
    private modal: NgbModal
  ) {}
  @Input() employeeId: number = -1;
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() overtimeDates: { overtimeDate: string; overtimeHours: number }[] =
    [];
  @Input() takenLeaveDates: Date[] = [];
  @Input() vacationDates: Date[] = [];
  @Input() dutyDates: Date[] = [];
  @Input() serviceOfferings: { date: string; numberOfServices: number }[] = [];
  overtimeDateCount: number = 0;
  modalData: {
    action: string;
    event: any;
  } = { action: '', event: {} as any };
  employee: any;
  ngOnInit() {
    this.employee = {
      firstName: this.firstName,
      lastName: this.lastName,
      overtimeDate: this.overtimeDates,
      takenLeaveDates: this.takenLeaveDates,
    };
    this.overtimeDateCount = this.overtimeDates?.length;
  }

  onDeleteButtonClick(): void {
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employeeId).subscribe(
      (response) => {
        console.log('API response:', response);
      },
      (error) => {
        console.error('API error:', error);
      }
    );
    this.modal.dismissAll();
  }
}
