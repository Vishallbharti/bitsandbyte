import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMaterialViewComponent } from './student-material-view.component';

describe('StudentMaterialViewComponent', () => {
  let component: StudentMaterialViewComponent;
  let fixture: ComponentFixture<StudentMaterialViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMaterialViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMaterialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
