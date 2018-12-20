import { TestBed, inject } from '@angular/core/testing';

import { BrancheService } from './branche.service';

describe('BrancheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrancheService]
    });
  });

  it('should be created', inject([BrancheService], (service: BrancheService) => {
    expect(service).toBeTruthy();
  }));
});
