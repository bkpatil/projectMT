import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from "../../../service/data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-pop-emp-task',
  templateUrl: './pop-emp-task.component.html',
  styleUrls: ['./pop-emp-task.component.css']
})
export class PopEmpTaskComponent implements OnInit {
  updateStatusForm: FormGroup;
  private employees: any;
  showStatus: boolean = false;
  projectNameInput: any;
  public statusList: any;
  constructor( private _DataService : DataService,
               private snackbar: MatSnackBar,
               private dialogRef : MatDialogRef<PopEmpTaskComponent>,
               @Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit() {
    this.getEmployee();
    this.getStatus();
    this.updateStatusForm = new FormGroup({
      id: new FormControl(this.data.id),
      projectsName: new FormControl(this.data.projectsName),
      moduleName: new FormControl(this.data.moduleName,[Validators.required]),
      // employeeName: new FormControl(this.data.employeeName,[Validators.required]),
      status: new FormControl(this.data.status,[Validators.required]), 
      // date: new FormControl(this.data.date,[Validators.required]),
      // estimatedEndDate: new FormControl(this.data.estimatedEndDate,[Validators.required]),
      // note: new FormControl(this.data.note,[Validators.required]),
    });
   
  };
  onClose(){
      this.dialogRef.close();
  };
  onClear(){
      this.updateStatusForm.reset();
  };
  getEmployee(){
    let url = "employees";
    this._DataService.getServerData(url).subscribe(results=>{
      this.employees = results;
      // console.log(results);
    })
  };
  onSubmit(data){
      // if(this.data.id == null){ 
      //   // debugger
      //     let url = "projectsName/save";
      //     this._DataService.addData(url,data).subscribe(result=>{
      //         this.snackbar.open("Task added successfully","OK",{
      //             duration: 5000
      //         })
      //         this.onClose();
      //     })
      // }else{
        let url = "employeeProjectNameDetails/"+this.data.id +"/"+data.moduleName;
        // debugger
        console.log(url);
          this._DataService.updateData(url,data).subscribe(result=>{
              this.snackbar.open("Status updated successfully","OK",{
                  duration: 5000
              })
              this.onClose();
          })
      }
  
  getStatus(){
    let url = "statusDetails";
    this._DataService.getServerData(url).subscribe(result=>{
        this.statusList = result;
    })
  }

}
