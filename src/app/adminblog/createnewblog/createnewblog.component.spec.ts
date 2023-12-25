import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewblogComponent } from './createnewblog.component';

describe('CreatenewblogComponent', () => {
  let component: CreatenewblogComponent;
  let fixture: ComponentFixture<CreatenewblogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatenewblogComponent]
    });
    fixture = TestBed.createComponent(CreatenewblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
