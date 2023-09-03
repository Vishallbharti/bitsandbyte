import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewBlogComponent } from './admin-view-blog.component';

describe('AdminViewBlogComponent', () => {
  let component: AdminViewBlogComponent;
  let fixture: ComponentFixture<AdminViewBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
