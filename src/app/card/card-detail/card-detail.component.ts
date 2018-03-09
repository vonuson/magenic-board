import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ArrayExtensionService } from '@shared/service/array-extension/array-extension.service';
import { CardDetailService } from '@shared/service/card-detail/card-detail.service';
import { CardPopupEditComponent } from '../card-popup-edit/card-popup-edit.component'; 
import { CardPopupMoveComponent } from '../card-popup-move/card-popup-move.component'; 
import { ICardList } from '@shared/model/contract/card-list';
import { ICard } from '@shared/model/contract/card';
import { Card } from '@shared/model/concrete/card';


@Component({
  selector: 'mb-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.less']
})
export class CardDetailComponent implements OnInit {
  @Input() cardList: ICardList;
  @Output() reloadListEvent: EventEmitter<ICard[]> = new EventEmitter<ICard[]>();
  private cards: ICard[];
  private cardEntryIdle = true;
  private CardPopupEditComponentRef: MatDialogRef<CardPopupEditComponent>;
  private CardPopupMoveComponentRef: MatDialogRef<CardPopupMoveComponent>; 

  constructor(private cardDetailService: CardDetailService,
              private arrayExtensionService: ArrayExtensionService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.cardDetailService.getCardsById(String(this.cardList.boardId), String(this.cardList.id))
      .subscribe((cards: ICard[]) => {
        this.cards = cards.sort((a, b) =>
          this.arrayExtensionService.compareSortEntry(a.order, b.order)
        );
        console.log('CardDetailComponent - Cards:' + JSON.stringify(cards));
      });
  }

  private toggleCardEntry(): void {
    this.cardEntryIdle = !this.cardEntryIdle;
  }

  private onSubmit(form): void {
    if (form.value.cardEntry) {
      const nextOrder = this.arrayExtensionService.getNextCardOrder(this.cards);
      let newCard = new Card(this.cardList.boardId, this.cardList.id, form.value.cardEntry, nextOrder);
      this.cardDetailService.addCard(newCard).subscribe(res => {
        console.log('Card-id: ' + res['id'] + ' has been added.');
        newCard.id = res['id'];
        this.cards.push(newCard);
        this.toggleCardEntry();
        form.reset();
      });
    }
  }

  private onCardEdit(card: ICard, event): void {
    this.CardPopupEditComponentRef = this.dialog.open(CardPopupEditComponent, {
      width: '254px',
      data: {
        input: card.cardName
      }
    });

    this.CardPopupEditComponentRef.afterClosed().subscribe(data => {
      if(data && data.input != card.cardName) {
        let newCard = card;
        newCard.cardName = data.input;
        this.cardDetailService
          .editCard(newCard)
          .subscribe(res => 
            console.log('Card-id: ' + res['id'] + ' has been updated.')
          );
      }
    });

    const height = event.clientY  > window.innerHeight - 180 ? (window.innerHeight - 180)  + 'px': event.clientY  + 'px';
    const width = event.clientX > window.innerWidth - 264 ? (window.innerWidth - 264) + 'px' : event.clientX + 'px';
    this.CardPopupEditComponentRef.updatePosition({ top: height, left: width });
  }

  private onCardMove(card: ICard, event): void {
    this.CardPopupMoveComponentRef = this.dialog.open(CardPopupMoveComponent, {
      width: '310px',
      data: {
        title: 'Move Card',
        card: card
      }
    });

    this.CardPopupMoveComponentRef.afterClosed().subscribe(data => {
      const prevOrder = card.order;

      if(data && !(data.listId == card.cardListId && data.newOrder == prevOrder)) {

        if(data.listId == card.cardListId){
          let filteredCards = this.cards.filter(crd => (crd.order >= data.newOrder) || (crd.order >= prevOrder));

          for(let i = 0; i < filteredCards.length; i++){
            let itrCard = filteredCards[i];

            if(itrCard.id != card.id && data.newOrder < prevOrder && itrCard.order >= data.newOrder && itrCard.order < prevOrder) {
              filteredCards[i].order += 1;
            } else if (itrCard.id != card.id && data.newOrder > prevOrder && itrCard.order <= data.newOrder && itrCard.order > prevOrder) {
              filteredCards[i].order -= 1;
            } else if(itrCard.id == card.id) {
              filteredCards[i].order = data.newOrder;
            }

          }

          this.updateMovedCards(filteredCards);
          this.cards = this.cards.sort((a, b) => this.arrayExtensionService.compareSortEntry(a.order, b.order));

        } else {

          this.cardDetailService.getCardsById(String(this.cardList.boardId), data.listId).flatMap((list: ICard[]) => {
            return Observable.of(list);
          }).subscribe(res => {

            let filteredDestinationCards = res.filter(crd => crd.order >= data.newOrder);
            for(let i = 0; i < filteredDestinationCards.length; i++){
              filteredDestinationCards[i].order += 1;
            }

            let filteredSourceCards = this.cards.filter(crd => crd.order >= prevOrder);
            for(let i = 0; i < filteredSourceCards.length; i++){
              let itrCard = filteredSourceCards[i];

              if(itrCard.id != card.id){
                filteredSourceCards[i].order -= 1;
              } else {
                filteredSourceCards[i].order = data.newOrder;
                filteredSourceCards[i].cardListId = data.listId;
              }
            }

            this.updateMovedCards(filteredDestinationCards.concat(filteredSourceCards));
            
            this.reloadListEvent.emit(filteredDestinationCards);
          });
        }
      }
    });


    const height = event.clientY  > window.innerHeight - 260 ? (window.innerHeight - 260)  + 'px': event.clientY  + 'px';
    const width = event.clientX > window.innerWidth - 320 ? (window.innerWidth - 320) + 'px' : event.clientX + 'px';
    this.CardPopupMoveComponentRef.updatePosition({ top: height, left: width });
  }

  private updateMovedCards(cards: ICard[]): void{
    for(let itrCard of cards){
      this.cardDetailService.editCard(itrCard).subscribe();
      console.log('Card-id: ' + itrCard.id + '\'s has been updated to ' + itrCard.order);
    }
  }
}
