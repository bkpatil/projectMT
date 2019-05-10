import { Injectable } from '@angular/core';
import { DeletePopupComponent } from "../component/delete-popup/delete-popup.component";
import { MatDialog } from "@angular/material";
@Injectable({
  providedIn: 'root'
})
export class DeletePopupService {

  constructor( private dialog : MatDialog ) { }
  openDeleteDialog(msg){
      return this.dialog.open(DeletePopupComponent,{
          width: '30%',
          panelClass: 'confirm-dialog-container',
          disableClose: false,
          position: { top: "10px" },
          data :{
              message : msg
        }
      })
  }
}
