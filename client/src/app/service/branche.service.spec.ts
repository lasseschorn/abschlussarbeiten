import { TestBed } from '@angular/core/testing';

import { BrancheService } from './branche.service';

describe('BrancheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrancheService = TestBed.get(BrancheService);
    expect(service).toBeTruthy();
  });
});
