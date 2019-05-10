import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { DataService } from "../../service/data.service";
import { DeletePopupService } from "../../service/delete-popup.service";
import { TaskPopupComponent } from "../task-popup/task-popup.component";
import { TeskEditPopupComponent } from "../tesk-edit-popup/tesk-edit-popup.component";
import { StatusPopupComponent } from "../status-popup/status-popup.component";
import { MatDialog, MatSnackBar,MatTableDataSource,MatSort, MatDialogRef } from "@angular/material";
// import { projection } from '@angular/core/src/render3';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // private projectsDetails : MatTableDataSource<object[]>;
  private projectName : any;
  private statusList : any;
  public showCommont : any;
  public searchKey : string;
  public projectsList: any;
  @Input('projName') projName: any;
  @Input('fields') projectsDetails:MatTableDataSource<any>
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['moduleName', 'employeeName', 'date', 'estimatedEndDate', 'status', 'note', 'action'];
  constructor( private dialog : MatDialog, 
               private snackBar : MatSnackBar,
               private _DataService : DataService,
               private _DeletePopupService : DeletePopupService ) { }

  ngOnInit() {
      this.getData();
      this.getStatus();
  };
  applyFilter(search: string){
      this.projectsDetails.filter = search.trim().toLowerCase();
  };
  getData(){
      let url = "projectsName/projectDetails/"+this.projName.projectsName;
      this._DataService.getServerData(url).subscribe(result=>{
          this.projectsList = result;
          this.projectsDetails = new MatTableDataSource(this.projectsList['projectDetails']);
          this.projectsDetails.sort = this.sort;
          // console.log(this.projectDetails);
      })
  };
  addTask(){
      let projectName = this.projName;
      const dialogRef = this.dialog.open(TaskPopupComponent,{
          maxWidth: "400px",
          autoFocus: true,
          position:{ top:'5%'},
          data : projectName
      })
      dialogRef.afterClosed().subscribe(()=>{
          this.getData();
      })
  };
  editTask(moduleName){
    console.log(this.projName.id);
    
      let projList = this.projectsDetails.data.find(x =>x.moduleName == moduleName);
      projList.id = this.projName.id;
      projList.projName = this.projName.projectsName;
      debugger
      const dialogRef = this.dialog.open(TeskEditPopupComponent,{
          maxWidth: "400px",
          autoFocus: true,
          position: { top: "5%"},
          data: projList   
      })
      dialogRef.afterClosed().subscribe(()=>{
          this.getData();
      })
  };
  deleteTask(moduleName){
      this._DeletePopupService.openDeleteDialog("Are you sure to delete this?").afterClosed().subscribe(result=>{
          if(result){
            var obj = {
              moduleName: moduleName
            }
            let url = "projectDetails/"+this.projName.id+"/"+moduleName;
            this._DataService.deleteData(url).subscribe(result=>{
                this.snackBar.open("Task deleted successfully","OK",{
                    duration: 1000
                })
                this.getData();
            })
          }
      })


      
      // this._DataService.deleteData(url).subscribe(result=>{
      //     this.snackBar.open("Task deleted successfully","OK",{
      //         duration: 5000
      //     })
      //     this.getData();
      // })
  };
  getStatus(){
      let url = "statusDetails";
      this._DataService.getServerData(url).subscribe(result=>{
          this.statusList = result;
      })
  }
  addStatus(){     
      let url = "Status";
      const dialogRef = this.dialog.open(StatusPopupComponent,{
          width: "250px",
          autoFocus: true,
          position: { top:"12%",left:"72%"},
          data: {}
      })
      dialogRef.afterClosed().subscribe(()=>{
          this.getStatus();
      })
  }
}
