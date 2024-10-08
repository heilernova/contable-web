import { TestBed } from '@angular/core/testing';

import { ApiVoucherTypesService } from './api-voucher-types.service';

describe('ApiVoucherTypesService', () => {
  let service: ApiVoucherTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiVoucherTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
