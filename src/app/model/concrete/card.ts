import { ICard } from '../contract/card';

export class Card implements ICard {
    public id: number;

    constructor(public boardId: number,
                public cardListId: number,
                public cardName: string,
                public order: number){
    }
}
