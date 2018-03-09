import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SharedModule } from '@shared/shared.module';

import { CardListComponent } from './card-list/card-list.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardPopupEditComponent } from './card-popup-edit/card-popup-edit.component';
import { CardPopupMoveComponent } from './card-popup-move/card-popup-move.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [CardListComponent, CardDetailComponent, CardPopupEditComponent, CardPopupMoveComponent],
  exports: [CardListComponent, CardDetailComponent],
  entryComponents: [CardPopupEditComponent, CardPopupMoveComponent]
})
export class CardModule { }
