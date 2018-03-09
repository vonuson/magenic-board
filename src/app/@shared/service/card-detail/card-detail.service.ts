import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';

import { ICard } from '@shared/model/contract/card';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class CardDetailService {

  constructor(private http: HttpClient) { }

  public getCardsById(boardId: string, listId: string) {
    let params = new HttpParams();
    params = params.append('boardId', boardId);
    params = params.append('cardListId', listId);
    
    return this.http.get<ICard[]>(environment.CARD_URL, { params: params });
  }

  public addCard(card: ICard): Observable<Object>{
    return this.http.post(environment.CARD_URL, {
      boardId: card.boardId,
      cardListId: card.cardListId,
      cardName: card.cardName,
      order: card.order
    });
  }

  public editCard(card: ICard): Observable<Object>{
    return this.http.put(environment.CARD_URL + '/' + card.id, {
      boardId: card.boardId,
      cardListId: card.cardListId,
      cardName: card.cardName,
      order: card.order
    });
  }
}
