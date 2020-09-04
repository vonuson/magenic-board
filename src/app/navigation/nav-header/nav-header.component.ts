import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardService } from '@shared/service/board/board.service';
import { BoardDialogService } from '@shared/service/board-dialog/board-dialog.service';

import { Router } from '@angular/router';
import { IBoard } from '@shared/model/contract/board';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mb-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.less']
})
export class NavHeaderComponent implements OnInit, OnDestroy {
  private boards: IBoard[] = [];
  private destroyed$ = new Subject();
  public user = 'Von Uson';

  constructor(
    private boardService: BoardService,
    private boardDialogService: BoardDialogService,
    private router: Router
  ) {

    this.boardDialogService.isRefresh$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(flag => {
        if (flag) {
          this.loadData();
          this.boardDialogService.setRefreshFlag(false);
          console.log('NavHeaderComponent: data refresh is done.');
        }
      });
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.boardService.getAllBoard()
      .subscribe(data => {
        console.log('NavHeaderComponent: Service data successfully received.');
        this.boards = data.sort((a, b) => a.boardName.localeCompare(b.boardName));
      }
      , err => console.log('error:' + err)
      );
  }

  private openInputDialog(event): void {
    this.boardDialogService.showBoardInputDialog();
    this.boardDialogService.changePosition(event.clientY, event.clientX);
  }

  private onClickBoard(): void {
    this.router.navigateByUrl('/board');
  }

  private onBoardClick(id: number): void {
    this.router.navigate(['/board', id]);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    console.log('NavHeaderComponent: cleanup is done.');
  }
}
