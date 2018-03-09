import { TestBed, inject } from '@angular/core/testing';

import { ArrayExtensionService } from './array-extension.service';

describe('ArrayExtensionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArrayExtensionService]
    });
  });

  it('should be created', inject([ArrayExtensionService], (service: ArrayExtensionService) => {
    expect(service).toBeTruthy();
  }));
});
