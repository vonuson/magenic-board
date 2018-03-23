import { TestBed, inject } from '@angular/core/testing';

import { CardDetailService } from './card-detail.service';
import { HttpClientModule } from '@angular/common/http';

describe('CardDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [CardDetailService]
    });
  });

  it('should be created', inject([CardDetailService], (service: CardDetailService) => {
    expect(service).toBeTruthy();
  }));
});
