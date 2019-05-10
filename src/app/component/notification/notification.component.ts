import { Component, OnInit } from '@angular/core';
import { DataService } from "../../service/data.service";
import { DeletePopupService } from "../../service/delete-popup.service";
import { MatDialog,
         MatSort, 
         MatSnackBar,
         MatTableDataSource,
         MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  private notification: any;
  public notificationCount : any;
  public notificationList: MatTableDataSource<any>;
  displayedColumns: string[] = ['projectName','moduleName','employeeName','dueTime','dueDays']
  constructor( private _DataService : DataService,
               private _DeletePopupService : DeletePopupService,
               private dialogRef : MatDialogRef<NotificationComponent>,
               private snackbar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit() {
      this.getNotification();
  };
  onClose(){
      this.dialogRef.close();
  };
  applyFilter(search: string){
    this.notificationList.filter = search.trim().toLowerCase();
  };
  getNotification(){
      let  url = "Projects/assignProjects";
      this._DataService.getServerData(url).subscribe(result=>{
          this.notification = result;
          this.notificationList = new MatTableDataSource(this.notification);
          this.notificationCount = this.notificationList.data.length;
          console.log()
      })
  }
}
