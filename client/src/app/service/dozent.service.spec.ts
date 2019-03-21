import { TestBed } from '@angular/core/testing';

import { DozentService } from './dozent.service';

describe('DozentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DozentService = TestBed.get(DozentService);
    expect(service).toBeTruthy();
  });
});
