import { ICard } from '@shared/model/contract/card';
import { Observable, of } from 'rxjs';

export class CardDetailServiceStub {
  cards: Array<ICard> = [
    { id: 1, boardId: 1, cardListId: 1, cardName: 'card_name', order: 1 },
    { id: 2, boardId: 1, cardListId: 1, cardName: 'card_name2', order: 2 },
    { id: 3, boardId: 2, cardListId: 1, cardName: 'card_name3', order: 1 },
    { id: 4, boardId: 1, cardListId: 2, cardName: 'card_name4', order: 2 },
  ];

  constructor() { }

  public getCardsById(boardId: string, listId: string): Observable<ICard[]> {
    const result = this.cards.filter((_) => String(_.boardId) === boardId && String(_.cardListId) === listId);
    return of(result);
  }

  public addCard(card: ICard): Observable<Object> {
    const result = this.cards.push(card);
    return of(result);
  }

  public editCard(card: ICard): Observable<Object> {
    const result = this.cards.filter(_ => _.id === card.id);
    return of(result);
  }
}
