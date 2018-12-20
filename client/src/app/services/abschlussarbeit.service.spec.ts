import { TestBed, inject } from '@angular/core/testing';

import { AbschlussarbeitService } from './abschlussarbeit.service';

describe('AbschlussarbeitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbschlussarbeitService]
    });
  });

  it('should be created', inject([AbschlussarbeitService], (service: AbschlussarbeitService) => {
    expect(service).toBeTruthy();
  }));
});
