import { TestBed } from '@angular/core/testing';

import { CiiuService } from './ciiu.service';

describe('CiiuService', () => {
  let service: CiiuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiiuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
