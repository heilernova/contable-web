import { TestBed } from '@angular/core/testing';

import { ApiTaxResponsibilitiesService } from './api-tax-responsibilities.service';

describe('ApiTaxResponsibilitiesService', () => {
  let service: ApiTaxResponsibilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTaxResponsibilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
