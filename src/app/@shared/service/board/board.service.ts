import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';

import { IBoard } from '@shared/model/contract/board';

@Injectable()
export class BoardService {
  private newId = 0;

  constructor(private http: HttpClient) { }

  public getAllBoard(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(environment.BOARDS_URL).pipe(
      tap(data => console.log('BoardService - All Board Data:' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  public getBoard(id: number): Observable<IBoard> {
    return this.http.get<IBoard>(environment.BOARDS_URL + '/' + id).pipe(
      tap(data => console.log('BoardService - Board Data:' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  public addBoard(board: IBoard): Observable<Object> {
    return this.http.post(environment.BOARDS_URL, {
      boardName: board.boardName,
      boardColor: board.boardColor
    });
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `BoardService: An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `BoardService: Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return observableThrowError(errorMessage);
  }
}
