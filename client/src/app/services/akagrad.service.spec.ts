import { TestBed, inject } from '@angular/core/testing';

import { AkagradService } from './akagrad.service';

describe('AkagradService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AkagradService]
    });
  });

  it('should be created', inject([AkagradService], (service: AkagradService) => {
    expect(service).toBeTruthy();
  }));
});
