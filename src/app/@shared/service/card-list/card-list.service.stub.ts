import { Observable } from 'rxjs/Observable';
import { ICardList } from '@shared/model/contract/card-list';

export class CardListService {
  cardList: Array<ICardList> = [
    { id: 1, boardId: 1, listName: 'listName', order: 1 },
    { id: 2, boardId: 1, listName: 'listName2', order: 2 },
    { id: 3, boardId: 2, listName: 'listName3', order: 1 },
  ]

  constructor() { }
  
  public getCardListByBoardId(boardId: string) {
    let result = this.cardList.filter(_ => String(_.boardId) === boardId);
    return Observable.of(result);
  }

  public addCardList(cardList: ICardList): Observable<Object> {
    let result = this.cardList.push(cardList);
    return Observable.of(result);
  }
}
