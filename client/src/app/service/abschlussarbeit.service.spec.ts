import { TestBed } from '@angular/core/testing';

import { AbschlussarbeitService } from './abschlussarbeit.service';

describe('AbschlussarbeitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbschlussarbeitService = TestBed.get(AbschlussarbeitService);
    expect(service).toBeTruthy();
  });
});
