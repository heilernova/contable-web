import { TestBed } from '@angular/core/testing';

import { ApiCompaniesService } from './api-companies.service';

describe('ApiCompaniesService', () => {
  let service: ApiCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
