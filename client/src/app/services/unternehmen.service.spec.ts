import { TestBed, inject } from '@angular/core/testing';

import { UnternehmenService } from './unternehmen.service';

describe('UnternehmenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnternehmenService]
    });
  });

  it('should be created', inject([UnternehmenService], (service: UnternehmenService) => {
    expect(service).toBeTruthy();
  }));
});
