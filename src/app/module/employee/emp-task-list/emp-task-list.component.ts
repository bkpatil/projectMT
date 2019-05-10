import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { DataService } from "../../../service/data.service";
import { DeletePopupService } from "../../../service/delete-popup.service";
import { PopEmpTaskComponent } from "../../../module/employee/edit-status/pop-emp-task.component";
import { StatusPopupComponent } from "../../../component/status-popup/status-popup.component";
import { MatDialog, MatSnackBar,MatTableDataSource,MatSort, MatDialogRef } from "@angular/material";
import { AddTaskPopupComponent } from "../../../module/employee/add-task-popup/add-task-popup.component";
@Component({
  selector: 'app-emp-task-list',
  templateUrl: './emp-task-list.component.html',
  styleUrls: ['./emp-task-list.component.css']
})
export class EmpTaskListComponent implements OnInit {
  public projectName : any;
  private statusList : any;
  public projectsList: any;
  @Input('projName') projName;
  @Input('fields') projectsDetails;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['moduleName', 'employeeName', 'date', 'estimatedEndDate', 'status', 'note'];
  constructor( private dialog : MatDialog, 
               private snackBar : MatSnackBar,
               private _DataService : DataService,
               private _DeletePopupService : DeletePopupService ) { }

  ngOnInit() {
      this.getData();
      this.getStatus();
  };
  applyFilter(task: string){
      this.projectsDetails.filter = task.trim().toLowerCase();
  };
  getData(){
      let url = "projectsName/projectDetails/"+this.projName.projectsName;
      // let url = "getEmployeeProjects/"+this.projectsDetails;
      this._DataService.getServerData(url).subscribe(result=>{
          this.projectsList = result;
          this.projectsDetails = new MatTableDataSource(this.projectsList['projectDetails']);
          this.projectsDetails.sort = this.sort;
          // console.log(this.projectDetails);
      })
  };
  addTask(){
      let projectsName = this.projName;
      debugger;
      const dialogRef = this.dialog.open(AddTaskPopupComponent,{
          maxWidth: "400px",
          autoFocus: true,
          position:{ top:'5%'},
          data : projectsName
      })
      dialogRef.afterClosed().subscribe(()=>{
          this.getData();
      })
  };
  editTask(moduleName){
    console.log(this.projName.id);
      let projList = this.projectsDetails.data.find(x =>x.moduleName == moduleName);
      projList.id = this.projName.id;
      projList.projectsName = this.projName.projectsName;
      debugger
      const dialogRef = this.dialog.open(PopEmpTaskComponent,{
          maxWidth: "430px",
          autoFocus: true,
          position: { top: "5%",left: '40%'},
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

