import { TestBed, inject } from '@angular/core/testing';

import { CardListService } from './card-list.service';
import { HttpClientModule } from '@angular/common/http';

describe('CardListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CardListService]
    });
  });

  it('should be created', inject([CardListService], (service: CardListService) => {
    expect(service).toBeTruthy();
  }));
});
