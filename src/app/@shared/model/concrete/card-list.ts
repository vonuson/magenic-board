import { ICardList } from '../contract/card-list';

export class CardList implements ICardList {
  public id: number;

  constructor(
    public boardId: number,
    public listName: string,
    public order: number) { }
}
