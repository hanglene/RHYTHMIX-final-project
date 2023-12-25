import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogeditComponent } from './blogedit.component';

describe('BlogeditComponent', () => {
  let component: BlogeditComponent;
  let fixture: ComponentFixture<BlogeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogeditComponent]
    });
    fixture = TestBed.createComponent(BlogeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
