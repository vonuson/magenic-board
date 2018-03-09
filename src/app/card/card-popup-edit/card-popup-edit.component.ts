import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'mb-card-popup-edit',
  templateUrl: './card-popup-edit.component.html',
  styleUrls: ['./card-popup-edit.component.less']
})
export class CardPopupEditComponent {
  private input: string;

  constructor(public dialogRef: MatDialogRef<CardPopupEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.input = data.input !== undefined ? data.input : '';
  }

  private keyupEnter(input) {
    this.dialogRef.close({ input: input});
  }
}
