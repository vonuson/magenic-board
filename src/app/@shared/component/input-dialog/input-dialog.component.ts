import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'mb-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.less']
})
export class InputDialogComponent {
  title: string;
  message: string;
  btn: string;
  response: string;

  readonly defaultTitleMessage = '';
  readonly defaultButton = 'btn';

  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = (data && data.title) ? data.title : this.defaultTitleMessage;
    this.message = (data && data.message) ? data.message : this.defaultTitleMessage;
    this.btn = (data && data.btn) ? data.btn : this.defaultButton;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  keyupEnter(response) {
    this.dialogRef.close({ response: response });
  }
}
