import { TestBed } from '@angular/core/testing';

import { AccessoireService } from './accessoire.service';

describe('AccessoireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessoireService = TestBed.get(AccessoireService);
    expect(service).toBeTruthy();
  });
});
