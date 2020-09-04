import { Observable, of } from 'rxjs';
import { ICardList } from '@shared/model/contract/card-list';

export class CardListServiceStub {
  cardList: Array<ICardList> = [
    { id: 1, boardId: 1, listName: 'listName', order: 1 },
    { id: 2, boardId: 1, listName: 'listName2', order: 2 },
    { id: 3, boardId: 2, listName: 'listName3', order: 1 },
  ];

  constructor() { }

  public getCardListByBoardId(boardId: string) {
    const result = this.cardList.filter(_ => String(_.boardId) === boardId);
    return of(result);
  }

  public addCardList(cardList: ICardList): Observable<Object> {
    const result = this.cardList.push(cardList);
    return of(result);
  }
}
