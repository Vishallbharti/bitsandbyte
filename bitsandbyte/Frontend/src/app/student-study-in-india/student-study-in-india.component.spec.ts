import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStudyInIndiaComponent } from './student-study-in-india.component';

describe('StudentStudyInIndiaComponent', () => {
  let component: StudentStudyInIndiaComponent;
  let fixture: ComponentFixture<StudentStudyInIndiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentStudyInIndiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentStudyInIndiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
