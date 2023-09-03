import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUploadMaterialComponent } from './admin-upload-material.component';

describe('AdminUploadMaterialComponent', () => {
  let component: AdminUploadMaterialComponent;
  let fixture: ComponentFixture<AdminUploadMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUploadMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUploadMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
