import { TestBed, inject } from '@angular/core/testing';

import { BoardGuard } from './board.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('BoardGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [BoardGuard]
    });
  });

  it('should ...', inject([BoardGuard], (guard: BoardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
