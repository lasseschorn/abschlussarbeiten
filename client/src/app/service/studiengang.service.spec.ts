import { TestBed } from '@angular/core/testing';

import { StudiengangService } from './studiengang.service';

describe('StudiengangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudiengangService = TestBed.get(StudiengangService);
    expect(service).toBeTruthy();
  });
});
