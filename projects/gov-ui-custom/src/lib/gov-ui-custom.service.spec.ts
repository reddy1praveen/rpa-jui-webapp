import { TestBed, inject } from '@angular/core/testing';

import { GovUiCustomService } from './gov-ui-custom.service';

describe('GovUiCustomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GovUiCustomService]
    });
  });

  it('should be created', inject([GovUiCustomService], (service: GovUiCustomService) => {
    expect(service).toBeTruthy();
  }));
});
