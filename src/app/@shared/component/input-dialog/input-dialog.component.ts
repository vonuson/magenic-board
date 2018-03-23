import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  private response: string;

  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.title = data.title !== undefined ? data.title : '';
      this.message = data.message !== undefined ? data.message : '';
      this.btn = data.btn !== undefined ? data.btn : 'btn';
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  private keyupEnter(response) {
    this.dialogRef.close({ response: response });
  }
}
