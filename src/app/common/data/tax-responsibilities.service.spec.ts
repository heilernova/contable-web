import { TestBed } from '@angular/core/testing';

import { TaxResponsibilitiesService } from './tax-responsibilities.service';

describe('TaxResponsibilitiesService', () => {
  let service: TaxResponsibilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxResponsibilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
