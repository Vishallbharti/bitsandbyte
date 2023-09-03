import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageContactComponent } from './homepage-contact.component';

describe('HomepageContactComponent', () => {
  let component: HomepageContactComponent;
  let fixture: ComponentFixture<HomepageContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
