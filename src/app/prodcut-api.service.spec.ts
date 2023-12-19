import { TestBed } from '@angular/core/testing';

import { ProdcutAPIService } from './prodcut-api.service';

describe('ProdcutAPIService', () => {
  let service: ProdcutAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdcutAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
