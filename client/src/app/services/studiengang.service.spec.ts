import { TestBed, inject } from '@angular/core/testing';

import { StudiengangService } from './studiengang.service';

describe('StudiengangService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudiengangService]
    });
  });

  it('should be created', inject([StudiengangService], (service: StudiengangService) => {
    expect(service).toBeTruthy();
  }));
});
