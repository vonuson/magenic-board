import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { InputDialogComponent } from './component/input-dialog/input-dialog.component';
import { HoverClassDirective } from './directives/hover-class/hover-class.directive';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    HoverClassDirective,
    InputDialogComponent,
    PageNotFoundComponent,
  ],
  exports: [
    FormsModule,
    HoverClassDirective,
    InputDialogComponent,
    PageNotFoundComponent,
  ],
  entryComponents: [InputDialogComponent]
})
export class SharedModule { }
