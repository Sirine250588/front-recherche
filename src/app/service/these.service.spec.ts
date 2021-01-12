import { TestBed } from '@angular/core/testing';

import { TheseService } from './these.service';

describe('TheseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheseService = TestBed.get(TheseService);
    expect(service).toBeTruthy();
  });
});
