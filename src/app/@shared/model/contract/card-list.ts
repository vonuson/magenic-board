import { IOrder } from './order';

export interface ICardList extends IOrder {
  id: number;
  boardId: number;
  listName: string;
}
