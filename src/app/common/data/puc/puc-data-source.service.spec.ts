import { TestBed } from '@angular/core/testing';

import { PucDataSourceService } from './puc-data-source.service';

describe('PucDataSourceService', () => {
  let service: PucDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PucDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
