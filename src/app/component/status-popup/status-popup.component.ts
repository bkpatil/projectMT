import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef,MatSnackBar } from "@angular/material";
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { DataService } from "../../service/data.service";
@Component({
  selector: 'app-status-popup',
  templateUrl: './status-popup.component.html',
  styleUrls: ['./status-popup.component.css']
})
export class StatusPopupComponent implements OnInit {
  statusForm: FormGroup;
  public statusList: any;
  public editForm: boolean = false;
  displayedColumns: string[] =['name','action'];
  constructor( private _DataService : DataService,
               private snackbar: MatSnackBar, 
               private dialog: MatDialog,
               private dialogRef: MatDialogRef<StatusPopupComponent>,
               @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    this.getStatus();
    this.statusForm = new FormGroup({
        name: new FormControl(this.data.name,[Validators.required]),
    })
  };
  onClose(){
      this.dialogRef.close();
  };
  onClear(){
      this.statusForm.reset();
  }
  getStatus(){
    let url = "statusDetails";
       this._DataService.getServerData(url).subscribe(result=>{
          this.statusList = result;
          console.log(result);
       })
  };
  onSubmit(data){
      let url = "Status";
      this._DataService.addData(url,data).subscribe(result=>{
          this.snackbar.open("Status added successfully","OK",{
             duration: 5000
          })
          this.onClear();
          this.getStatus();
      })
  };
  editStatus(){
     const dialogRef = this.dialog.open(StatusPopupComponent,{
        width: "30%",
        autoFocus: true,
        data: status
     })
     dialogRef.afterClosed().subscribe(()=>{
        this.getStatus();
     })
  };
  deleteStatus(id){
     let url = "StatusDetails/"+id;
     this._DataService.deleteData(url).subscribe(result=>{
         this.snackbar.open("Status deleted successfully","OK",{
             duration: 5000
      })
      // this.dialogRef.afterClosed().subscribe((result)=>{
         this.getStatus();
      // })
     })
  }

}
