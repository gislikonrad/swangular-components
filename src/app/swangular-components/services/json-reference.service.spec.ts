import { TestBed, inject } from '@angular/core/testing';

import { JsonReferenceService } from './json-reference.service';

describe('JsonReferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonReferenceService]
    });
  });

  it('should be created', inject([JsonReferenceService], (service: JsonReferenceService) => {
    expect(service).toBeTruthy();
  }));
});
