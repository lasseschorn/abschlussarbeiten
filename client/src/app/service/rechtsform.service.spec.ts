import { TestBed } from '@angular/core/testing';

import { RechtsformService } from './rechtsform.service';

describe('RechtsformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RechtsformService = TestBed.get(RechtsformService);
    expect(service).toBeTruthy();
  });
});
