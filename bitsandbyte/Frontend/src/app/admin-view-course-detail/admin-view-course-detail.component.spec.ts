import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewCourseDetailComponent } from './admin-view-course-detail.component';

describe('AdminViewCourseDetailComponent', () => {
  let component: AdminViewCourseDetailComponent;
  let fixture: ComponentFixture<AdminViewCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewCourseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
