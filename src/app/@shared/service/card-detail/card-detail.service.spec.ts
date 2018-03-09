import { TestBed, inject } from '@angular/core/testing';

import { CardDetailService } from './card-detail.service';

describe('CardDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardDetailService]
    });
  });

  it('should be created', inject([CardDetailService], (service: CardDetailService) => {
    expect(service).toBeTruthy();
  }));
});
