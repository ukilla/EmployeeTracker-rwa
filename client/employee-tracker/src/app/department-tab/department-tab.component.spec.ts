import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTabComponent } from './department-tab.component';

describe('DepartmentTabComponent', () => {
  let component: DepartmentTabComponent;
  let fixture: ComponentFixture<DepartmentTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentTabComponent],
    });
    fixture = TestBed.createComponent(DepartmentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
