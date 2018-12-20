import { TestBed, inject } from '@angular/core/testing';

import { BetreuerService } from './betreuer.service';

describe('BetreuerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BetreuerService]
    });
  });

  it('should be created', inject([BetreuerService], (service: BetreuerService) => {
    expect(service).toBeTruthy();
  }));
});
