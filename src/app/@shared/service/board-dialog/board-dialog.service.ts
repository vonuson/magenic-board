import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

import { BoardService } from '../board/board.service';
import { Board } from '@shared/model/concrete/board';
import { InputDialogComponent } from '@shared/component/input-dialog/input-dialog.component';

@Injectable()
export class BoardDialogService {
  private inputDialogComponentRef: MatDialogRef<InputDialogComponent>;
  private refreshSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isRefresh$ = this.refreshSubject.asObservable();

  constructor(
    private boardService: BoardService,
    private router: Router,
    private dialog: MatDialog) { }

  public showBoardInputDialog() {
    this.inputDialogComponentRef = this.dialog.open(InputDialogComponent, {
      width: '310px',
      data: {
        title: 'New Board',
        message: 'Title',
        btn: 'Create'
      }
    });

    this.inputDialogComponentRef.afterClosed().subscribe(data => {
      if(data && data.response) { 
        this.boardService
          .addBoard(new Board(data.response))
          .subscribe(res => {
            console.log('Board-id: ' + res['id'] + ' has been added. Refresh intialize.');
            this.setRefreshFlag(true);
            this.router.navigate(['/board', res['id']]);
          });
      }
    });
  }

  public changePosition(ClientY: number, ClientX: number){
    const height = ClientY > window.innerHeight - 210 ? (window.innerHeight - 210)  + 'px': ClientY + 'px';
    const width = ClientX > window.innerWidth - 320 ? (window.innerWidth - 320) + 'px' : ClientX + 'px';
    this.inputDialogComponentRef.updatePosition({ top: height, left: width });
  }

  public setRefreshFlag(flag: boolean): void {
    this.refreshSubject.next(flag);
  }
}
