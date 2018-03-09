import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

import { ArrayExtensionService } from '@shared/service/array-extension/array-extension.service';
import { CardDetailService } from '@shared/service/card-detail/card-detail.service';
import { CardListService } from '@shared/service/card-list/card-list.service';
import { ICardList } from '@shared/model/contract/card-list';
import { ICard } from '@shared/model/contract/card';
import { Card } from '@shared/model/concrete/card';

@Component({
  selector: 'mb-card-popup-move',
  templateUrl: './card-popup-move.component.html',
  styleUrls: ['./card-popup-move.component.css']
})
export class CardPopupMoveComponent {
  private title: string;
  private startingCard: ICard;
  private cardLists: ICardList[];
  private cards: ICard[];
  private selectedCardListId: number;
  private selectedCardOrder: number;
  
  constructor(private cardDetailService: CardDetailService,
    private cardListService: CardListService,
    private arrayExtensionService: ArrayExtensionService,
    public dialogRef: MatDialogRef<CardPopupMoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.title = data.title !== undefined ? data.title : '';
      this.startingCard = data.card !== undefined ? data.card : {};

      if(this.startingCard) this.getCardList();
  }

  private getCardList(): void{
    this.cardListService
      .getCardListByBoardId(String(this.startingCard.boardId))
      .subscribe((list: ICardList[]) =>  { 
        this.cardLists = list.sort((a, b) => 
          this.arrayExtensionService.compareSortEntry(a.order, b.order)
        );
        this.selectedCardListId = this.startingCard.cardListId;
        this.onSelect();
      }
    );
  }

  onSelect(): void{
    let cardlist: ICardList = this.cardLists.find(list => list.id === this.selectedCardListId);

    this.cardDetailService
      .getCardsById(String(cardlist.boardId), String(cardlist.id))
      .subscribe((cards: ICard[]) => {
        this.cards = cards.sort((a, b) =>
          this.arrayExtensionService.compareSortEntry(a.order, b.order)
        );
        const nextCardOrder = this.arrayExtensionService.getNextCardOrder(this.cards);
        this.selectedCardOrder = this.startingCard.order;
        
        if (cardlist.id != this.startingCard.cardListId){
          this.cards.push(new Card(cardlist.boardId, cardlist.id, '', nextCardOrder));
          this.selectedCardOrder = nextCardOrder;
        }
      });
  }

  private onMoveClick(data) {
    this.dialogRef.close({ newOrder: this.selectedCardOrder, listId: this.selectedCardListId });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
