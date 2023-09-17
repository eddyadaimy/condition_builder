import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-new-condition',
  templateUrl: './save-new-condition.component.html',
  styleUrls: ['./save-new-condition.component.css']
})
export class SaveNewConditionComponent {
  @Output() sendConfirmaion = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<SaveNewConditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string){

  }

  closeDialog() {
    this.dialogRef.close();
  }

  confirm(){
    this.sendConfirmaion.emit(true);
  }

}
