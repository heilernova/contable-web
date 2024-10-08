import { TestBed } from '@angular/core/testing';

import { AccountsDataSourceService } from './accounts-data-source.service';

describe('AccountsDataSourceService', () => {
  let service: AccountsDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
