import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudyInIndiaComponent } from './admin-study-in-india.component';

describe('AdminStudyInIndiaComponent', () => {
  let component: AdminStudyInIndiaComponent;
  let fixture: ComponentFixture<AdminStudyInIndiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudyInIndiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudyInIndiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
