import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CardListService } from '@shared/service/card-list/card-list.service';
import { BoardService } from '@shared/service/board/board.service';
import { IBoard } from '@shared/model/contract/board';

@Component({
  selector: 'mb-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.less']
})
export class BoardDetailsComponent implements OnInit, OnDestroy {
  board: IBoard;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    // Note: flatMap - transform the items emitted by an Observable into Observables, 
    // then flatten the emissions from those into a single Observable.
    this.route.params.flatMap((params: Params) => {
        return Observable.of(params['id']);
      })
      .subscribe(res => this.displayBoardDetails(res));
  }

  private displayBoardDetails(id: number): void {
    this.boardService.getBoard(id)
      .subscribe(data => {
        this.board = data
        this.changeBackgroundColor(data.boardColor);
      }, (error) => {
        this.router.navigate(['/board/notFound', id]);
        console.log(error);
      }
    );
  }

  private changeBackgroundColor(color = 'white'){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = color;
  }

  ngOnDestroy() {
    this.changeBackgroundColor();
  }
}
