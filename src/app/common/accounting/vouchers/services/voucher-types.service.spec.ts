import { TestBed } from '@angular/core/testing';

import { VoucherTypesService } from '../voucher-types.service';

describe('VoucherTypesService', () => {
  let service: VoucherTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoucherTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
