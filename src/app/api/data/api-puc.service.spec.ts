import { TestBed } from '@angular/core/testing';

import { ApiPucService } from './api-puc.service';

describe('ApiPucService', () => {
  let service: ApiPucService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPucService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
