import { TestBed, inject } from '@angular/core/testing';

import { CardMoveService } from './card-move.service';
import { HttpClientModule } from '@angular/common/http';
import { CardDetailService } from '@shared/service/card-detail/card-detail.service';


describe('CardMoveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        CardMoveService,
        CardDetailService
      ]
    });
  });

  it('should be created', inject([CardMoveService], (service: CardMoveService) => {
    expect(service).toBeTruthy();
  }));
});
