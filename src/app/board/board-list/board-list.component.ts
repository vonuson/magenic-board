import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BoardDialogService } from '@shared/service/board-dialog/board-dialog.service';
import { BoardService } from '@shared/service/board/board.service';
import { IBoard } from '@shared/model/contract/board';

@Component({
  selector: 'mb-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.less']
})
export class BoardListComponent implements OnInit {
  private boards: IBoard[];

  constructor(
    private boardService: BoardService,
    private boardDialogService: BoardDialogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.boardService.getAllBoard()
      .subscribe(data => {
        console.log('BoardListComponent: Service data successfully received.');
        this.boards = data.sort((a, b) => a.boardName.localeCompare(b.boardName));
      }
        , err => console.log('error:' + err)
      );
  }

  private openInputDialog(event): void {
    this.boardDialogService.showBoardInputDialog();
    this.boardDialogService.changePosition(event.clientY, event.clientX);
  }

  private onBoardClick(id: number): void {
    this.router.navigate(['/board', id]);
  }
}
