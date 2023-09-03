import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotStudentPasswordComponent } from './forgot-student-password.component';

describe('ForgotStudentPasswordComponent', () => {
  let component: ForgotStudentPasswordComponent;
  let fixture: ComponentFixture<ForgotStudentPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotStudentPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotStudentPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
