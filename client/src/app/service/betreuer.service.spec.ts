import { TestBed } from '@angular/core/testing';

import { BetreuerService } from './betreuer.service';

describe('BetreuerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetreuerService = TestBed.get(BetreuerService);
    expect(service).toBeTruthy();
  });
});
