import { TestBed } from '@angular/core/testing';

import { ThirdPartiesService } from './third-parties.service';

describe('ThirdPartiesService', () => {
  let service: ThirdPartiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThirdPartiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
