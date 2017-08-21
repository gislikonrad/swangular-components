import { TestBed, inject } from '@angular/core/testing';

import { RequestBuilderService } from './request-builder.service';

describe('RequestBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestBuilderService]
    });
  });

  it('should be created', inject([RequestBuilderService], (service: RequestBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
