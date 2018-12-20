import { TestBed, inject } from '@angular/core/testing';

import { DozentService } from './dozent.service';

describe('DozentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DozentService]
    });
  });

  it('should be created', inject([DozentService], (service: DozentService) => {
    expect(service).toBeTruthy();
  }));
});
