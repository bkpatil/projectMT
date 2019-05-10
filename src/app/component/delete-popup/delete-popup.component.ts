import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {

  constructor( private dialogRef : MatDialogRef<DeletePopupComponent>, 
               @Inject(MAT_DIALOG_DATA) public data :any) { }

  ngOnInit() {
  };
  closeDialog(){
      this.dialogRef.close();
  }

}
