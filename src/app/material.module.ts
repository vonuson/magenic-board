import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatMenuModule,
  MatGridListModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatMenuModule, MatGridListModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule],
  exports: [MatToolbarModule, MatMenuModule, MatGridListModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule]
})
export class MaterialModule { }