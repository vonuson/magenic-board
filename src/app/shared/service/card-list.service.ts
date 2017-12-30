import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { ICardList } from '../../model/contract/card-list';

@Injectable()
export class CardListService {

  constructor(private http: HttpClient) { }
  
    public getCardListByBoardId(boardId: string) {
      let params = new HttpParams();
      params = params.append('boardId', boardId);
      
      return this.http.get<ICardList[]>(environment.CARD_LIST_URL, { params: params });
    }

    public addCardList(cardList: ICardList): Observable<Object> {
      return this.http.post(environment.CARD_LIST_URL, {
        boardId: cardList.boardId,
        listName: cardList.listName,
        order: cardList.order
      });
    }
}
