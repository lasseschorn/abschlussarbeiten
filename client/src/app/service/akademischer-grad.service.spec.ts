import { TestBed } from '@angular/core/testing';

import { AkademischerGradService } from './akademischer-grad.service';

describe('AkademischerGradService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AkademischerGradService = TestBed.get(AkademischerGradService);
    expect(service).toBeTruthy();
  });
});
