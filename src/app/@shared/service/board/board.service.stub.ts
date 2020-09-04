import { Observable, of } from 'rxjs';
import { IBoard } from '@shared/model/contract/board';

export class BoardServiceStub {
  boards: Array<IBoard> = [
    { id: 1, boardName: 'board_name1', boardColor: 'rgb(0, 121, 191)' },
    { id: 2, boardName: 'board_name2', boardColor: 'blue' }
  ];

  constructor() { }

  public getAllBoard(): Observable<IBoard[]> {
    return of(this.boards);
  }

  public getBoard(id: number): Observable<IBoard> {
    const result = this.boards.find(_ => _.id === id);
    return of(result);
  }

  public addBoard(board: IBoard): Observable<Object> {
    const result = this.boards.push(board);
    return of(result);
  }
}
