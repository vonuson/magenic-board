import { IOrder } from './order';

export interface ICard extends IOrder {
  id: number;
  boardId: number;
  cardListId: number;
  cardName: string;
}
