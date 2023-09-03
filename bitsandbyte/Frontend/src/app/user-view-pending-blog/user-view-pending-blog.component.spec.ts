import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewPendingBlogComponent } from './user-view-pending-blog.component';

describe('UserViewPendingBlogComponent', () => {
  let component: UserViewPendingBlogComponent;
  let fixture: ComponentFixture<UserViewPendingBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewPendingBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewPendingBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
