import { TestBed } from '@angular/core/testing';

import { StagaireService } from './stagaire.service';

describe('StagaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StagaireService = TestBed.get(StagaireService);
    expect(service).toBeTruthy();
  });
});
