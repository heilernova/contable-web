import { TestBed } from '@angular/core/testing';

import { DataLocationsService } from './data-locations.service';

describe('DataLocationsService', () => {
  let service: DataLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
