import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from "../../service/data.service";
import { DeletePopupService } from "../../service/delete-popup.service";
import { MatDialog,MatSort, MatSnackBar,MatTableDataSource,MatPaginator,MatDialogRef, MatDialogConfig } from "@angular/material";
import { EmpAddComponent } from "../../component/emp-add/emp-add.component";
import { EmpEditComponent } from "../../component/emp-edit/emp-edit.component";
@Component({
  selector: 'app-employee-popup',
  templateUrl: './employee-popup.component.html',
  styleUrls: ['./employee-popup.component.css']
})
export class EmployeePopupComponent implements OnInit {
  public employeeList : MatTableDataSource<any>;
  public username : any;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'mobileNo', 'email', 'position','userName', 'password', 'action'];
  constructor( private _DataService: DataService,
               private _DeletePopupService : DeletePopupService,
               private dialogRef : MatDialogRef<EmployeePopupComponent>,
               private snackbar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit() {
      this.getEmployee();
  };
  onClose(){
      this.dialogRef.close();
  }
  applyFilter(employee: string){
      this.employeeList.filter = employee.trim().toLowerCase();
  };
  getEmployee(){
      let url = "employees";
      this._DataService.getServerData(url).subscribe(result=>{
          this.employeeList = new MatTableDataSource(result);
          this.employeeList.sort = this.sort;
        })
  };
  addEmployee(){
    //   this.isEditMember=false;
      const dialogRef = this.dialog.open(EmpAddComponent,{
          width: "30%",
          autoFocus: true,
          position:{ top:'5%',left:'30%'},
          data : {}
      })
      dialogRef.afterClosed().subscribe(()=>{
          this.getEmployee();
      })
  };
  editEmployee(id){
      var employee = this.employeeList.data.find(x => x.id == id);
    //   this.isEditMember=true;
      const dialogRef = this.dialog.open(EmpEditComponent,{
      width: "30%",
      autoFocus: true,
      position:{ top:'5%',left: "20%"},
      data : employee 
      })
      dialogRef.afterClosed().subscribe(()=>{
          this.getEmployee();
      })
  };
  deleteEmployee(id){
      this._DeletePopupService.openDeleteDialog("Are you sure to delete this?").afterClosed().subscribe(res=>{
          if(res){
            var obj={
              id: id
          }
      let url = "employee/"+obj.id;
      this._DataService.deleteData(url).subscribe((result)=>{
          this.snackbar.open("Employee deleted successfully","OK",{
             duration: 5000
          })
          this.getEmployee();
      })
    }
  })
}
}
