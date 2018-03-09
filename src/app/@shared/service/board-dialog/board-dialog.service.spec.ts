import { TestBed, inject } from '@angular/core/testing';

import { BoardDialogService } from './board-dialog.service';

describe('BoardDialog.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardDialogService]
    });
  });

  it('should be created', inject([BoardDialogService], (service: BoardDialogService) => {
    expect(service).toBeTruthy();
  }));
});
