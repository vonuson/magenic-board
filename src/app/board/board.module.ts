import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '../card/card.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { BoardRoutingModule } from './board-routing.module';
import { BoardGuard } from './board.guard';

import { BoardListComponent } from './board-list/board-list.component';
import { BoardDetailsComponent } from './board-details/board-details.component';

@NgModule({
  imports: [
    CommonModule,
    BoardRoutingModule,
    MaterialModule,
    SharedModule,
    CardModule
  ],
  exports: [BoardListComponent],
  declarations: [BoardListComponent, BoardDetailsComponent],
  providers: [BoardGuard]
})
export class BoardModule { }
