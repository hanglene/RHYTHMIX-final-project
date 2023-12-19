import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNewComponent } from './admin-create-new.component';

describe('AdminCreateNewComponent', () => {
  let component: AdminCreateNewComponent;
  let fixture: ComponentFixture<AdminCreateNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateNewComponent]
    });
    fixture = TestBed.createComponent(AdminCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
