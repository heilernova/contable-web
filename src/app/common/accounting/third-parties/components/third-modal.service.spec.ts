import { TestBed } from '@angular/core/testing';

import { ThirdModalService } from './third-modal.service';

describe('ThirdModalService', () => {
  let service: ThirdModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThirdModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
