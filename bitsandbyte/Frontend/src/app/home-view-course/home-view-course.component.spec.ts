import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewCourseComponent } from './home-view-course.component';

describe('HomeViewCourseComponent', () => {
  let component: HomeViewCourseComponent;
  let fixture: ComponentFixture<HomeViewCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeViewCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
