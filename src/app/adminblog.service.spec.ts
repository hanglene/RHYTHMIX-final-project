import { TestBed } from '@angular/core/testing';

import { AdminblogService } from './adminblog.service';

describe('AdminblogService', () => {
  let service: AdminblogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminblogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
