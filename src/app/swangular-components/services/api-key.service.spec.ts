import { TestBed, inject } from '@angular/core/testing';

import { ApiKeyService } from './api-key.service';

describe('ApiKeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiKeyService]
    });
  });

  it('should be created', inject([ApiKeyService], (service: ApiKeyService) => {
    expect(service).toBeTruthy();
  }));
});
