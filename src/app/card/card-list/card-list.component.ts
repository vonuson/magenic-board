import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ArrayExtensionService } from '@shared/service/array-extension/array-extension.service';
import { CardListService } from '@shared/service/card-list/card-list.service';
import { ICardList } from '@shared/model/contract/card-list';
import { CardList } from '@shared/model/concrete/card-list';
import { ICard } from '@shared/model/contract/card';

@Component({
  selector: 'mb-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  private cardLists: ICardList[] = [];
  private listEntryIdle = true;
  private boardId: number;

  constructor(private route: ActivatedRoute,
              private cardListService: CardListService,
              private arrayExtensionService: ArrayExtensionService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.flatMap((params: Params) => {
        this.boardId = Number(params['id']);
        return Observable.of(params['id']);
      })
      .subscribe(res => this.displayCards(res));
  }

  private displayCards(boardId: string): void {
    this.cardListService.getCardListByBoardId(boardId)
      .subscribe((list: ICardList[]) =>  { 
        this.cardLists = list.sort((a, b) => 
          this.arrayExtensionService.compareSortEntry(a.order, b.order)
      );
      console.log('CardListComponent - Card List:' + JSON.stringify(list));
    });
  }

  private toggleListEntry(): void{
    this.listEntryIdle = !this.listEntryIdle;
  }

  private onSubmit(form): void{
    if(form.value.listEntry){
      const nextOrder = this.arrayExtensionService.getNextCardOrder(this.cardLists);
      let newCardList = new CardList(this.boardId, form.value.listEntry, nextOrder);
      this.cardListService.addCardList(newCardList).subscribe(res => {
        console.log('CardList-id: ' + res['id'] + ' has been added.');
        newCardList.id = res['id'];
        this.cardLists.push(newCardList);
        this.toggleListEntry();
        form.reset();
      });
    }
  }

  private reloadList(e){
    this.router.navigateByUrl('/board', { skipLocationChange: true}).then(() =>
    this.router.navigate(['/board', this.boardId]));
  }
}
