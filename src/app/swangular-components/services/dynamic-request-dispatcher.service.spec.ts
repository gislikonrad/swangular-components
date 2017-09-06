import { TestBed, inject } from '@angular/core/testing';

import { DynamicRequestDispatcherService } from './dynamic-request-dispatcher.service';

describe('DynamicRequestDispatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicRequestDispatcherService]
    });
  });

  it('should be created', inject([DynamicRequestDispatcherService], (service: DynamicRequestDispatcherService) => {
    expect(service).toBeTruthy();
  }));
});
