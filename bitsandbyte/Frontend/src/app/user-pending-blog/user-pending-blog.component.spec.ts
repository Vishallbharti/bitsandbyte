import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPendingBlogComponent } from './user-pending-blog.component';

describe('UserPendingBlogComponent', () => {
  let component: UserPendingBlogComponent;
  let fixture: ComponentFixture<UserPendingBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPendingBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPendingBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
