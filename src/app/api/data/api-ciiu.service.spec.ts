import { TestBed } from '@angular/core/testing';

import { ApiCiiuService } from './api-ciiu.service';

describe('ApiCiiuService', () => {
  let service: ApiCiiuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCiiuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
