import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutNewComponent } from './prodcut-new.component';

describe('ProdcutNewComponent', () => {
  let component: ProdcutNewComponent;
  let fixture: ComponentFixture<ProdcutNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdcutNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdcutNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
