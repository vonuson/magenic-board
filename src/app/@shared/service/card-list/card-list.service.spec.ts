import { TestBed, inject } from '@angular/core/testing';

import { CardListService } from './card-list.service';

describe('CardListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardListService]
    });
  });

  it('should be created', inject([CardListService], (service: CardListService) => {
    expect(service).toBeTruthy();
  }));
});
