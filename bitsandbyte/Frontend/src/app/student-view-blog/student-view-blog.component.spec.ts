import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewBlogComponent } from './student-view-blog.component';

describe('StudentViewBlogComponent', () => {
  let component: StudentViewBlogComponent;
  let fixture: ComponentFixture<StudentViewBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
