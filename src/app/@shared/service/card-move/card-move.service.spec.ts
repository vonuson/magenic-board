import { TestBed, inject } from '@angular/core/testing';

import { CardMoveService } from './card-move.service';

describe('CardMoveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardMoveService]
    });
  });

  it('should be created', inject([CardMoveService], (service: CardMoveService) => {
    expect(service).toBeTruthy();
  }));
});
