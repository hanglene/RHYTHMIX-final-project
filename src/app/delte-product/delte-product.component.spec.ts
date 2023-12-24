import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelteProductComponent } from './delte-product.component';

describe('DelteProductComponent', () => {
  let component: DelteProductComponent;
  let fixture: ComponentFixture<DelteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelteProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
