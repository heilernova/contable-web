import { TestBed } from '@angular/core/testing';

import { VoucherTypesDataService } from './voucher-types-data.service';

describe('VoucherTypesDataService', () => {
  let service: VoucherTypesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoucherTypesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
