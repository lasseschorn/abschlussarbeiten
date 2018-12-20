import { TestBed, inject } from '@angular/core/testing';

import { RechtsformService } from './rechtsform.service';

describe('RechtsformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RechtsformService]
    });
  });

  it('should be created', inject([RechtsformService], (service: RechtsformService) => {
    expect(service).toBeTruthy();
  }));
});
