import { Observable } from 'rxjs/Observable';
import { IBoard } from '@shared/model/contract/board';

export class BoardServiceStub {
  boards: Array<IBoard> = [
    { id: 1, boardName: 'board_name1', boardColor: 'rgb(0, 121, 191)' },
    { id: 2, boardName: 'board_name2', boardColor: 'blue' }    
  ]

  constructor() { }

  public getAllBoard(): Observable<IBoard[]> {
    return Observable.of(this.boards);
  }

  public getBoard(id: number): Observable<IBoard> {
    let result = this.boards.find(_ => _.id === id);
    return Observable.of(result);
  }

  public addBoard(board: IBoard): Observable<Object> {
    let result = this.boards.push(board);
    return Observable.of(result);
  }
}
