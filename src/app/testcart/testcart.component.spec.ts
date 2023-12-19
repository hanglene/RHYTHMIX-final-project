import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcartComponent } from './testcart.component';

describe('TestcartComponent', () => {
  let component: TestcartComponent;
  let fixture: ComponentFixture<TestcartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestcartComponent]
    });
    fixture = TestBed.createComponent(TestcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
