import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NavigationModule } from './navigation/navigation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BoardService } from '@shared/service/board/board.service';
import { CardListService } from '@shared/service/card-list/card-list.service';
import { CardDetailService } from '@shared/service/card-detail/card-detail.service';
import { BoardDialogService } from '@shared/service/board-dialog/board-dialog.service';
import { ArrayExtensionService } from '@shared/service/array-extension/array-extension.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NavigationModule
  ],
  providers: [
    BoardService,
    BoardDialogService,
    CardDetailService,
    CardListService,
    ArrayExtensionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
