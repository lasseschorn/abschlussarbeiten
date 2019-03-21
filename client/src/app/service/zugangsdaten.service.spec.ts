import { TestBed } from '@angular/core/testing';

import { ZugangsdatenService } from './zugangsdaten.service';

describe('ZugangsdatenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZugangsdatenService = TestBed.get(ZugangsdatenService);
    expect(service).toBeTruthy();
  });
});
