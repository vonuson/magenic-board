import { TestBed, inject } from '@angular/core/testing';

import { BoardService } from './board.service';
import { HttpClientModule } from '@angular/common/http';

describe('BoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BoardService]
    });
  });

  it('should be created', inject([BoardService], (service: BoardService) => {
    expect(service).toBeTruthy();
  }));
});
