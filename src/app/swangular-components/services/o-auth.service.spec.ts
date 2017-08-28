import { TestBed, inject } from '@angular/core/testing';

import { OAuthService } from './o-auth.service';

describe('OAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OAuthService]
    });
  });

  it('should be created', inject([OAuthService], (service: OAuthService) => {
    expect(service).toBeTruthy();
  }));
});
