import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { BoardDialogService } from './board-dialog.service';
import { BoardService } from '@shared/service/board/board.service';
import { SharedModule } from '@shared/shared.module';

describe('BoardDialog.Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule, 
        RouterTestingModule
      ],
      providers: [
        BoardDialogService, 
        BoardService,
      ]
    });
  });

  it('should be created', inject([BoardDialogService], (service: BoardDialogService) => {
    expect(service).toBeTruthy();
  }));
});
