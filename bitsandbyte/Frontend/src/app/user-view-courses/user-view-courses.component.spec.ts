import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewCoursesComponent } from './user-view-courses.component';

describe('UserViewCoursesComponent', () => {
  let component: UserViewCoursesComponent;
  let fixture: ComponentFixture<UserViewCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
