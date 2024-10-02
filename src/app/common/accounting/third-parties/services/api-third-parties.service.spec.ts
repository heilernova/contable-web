import { TestBed } from '@angular/core/testing';

import { ApiThirdPartiesService } from './api-third-parties.service';

describe('ApiThirdPartiesService', () => {
  let service: ApiThirdPartiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiThirdPartiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
