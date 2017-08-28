import { TestBed, inject } from '@angular/core/testing';

import { TemplateProviderService } from './template-provider.service';

describe('TemplateProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplateProviderService]
    });
  });

  it('should be created', inject([TemplateProviderService], (service: TemplateProviderService) => {
    expect(service).toBeTruthy();
  }));
});
