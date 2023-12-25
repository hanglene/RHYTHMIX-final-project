import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogeditComponent } from './blogedit.component';

describe('BlogeditComponent', () => {
  let component: BlogeditComponent;
  let fixture: ComponentFixture<BlogeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
