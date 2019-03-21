import { TestBed } from '@angular/core/testing';

import { UnternehmenService } from './unternehmen.service';

describe('UnternehmenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnternehmenService = TestBed.get(UnternehmenService);
    expect(service).toBeTruthy();
  });
});
