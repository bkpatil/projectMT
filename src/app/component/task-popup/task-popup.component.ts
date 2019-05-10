import { Component, OnInit, Inject, Input } from '@angular/core';
import { StatusPopupComponent } from "../status-popup/status-popup.component";
import { DataService } from "../../service/data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.css']
})
export class TaskPopupComponent implements OnInit {
  addTaskForm: FormGroup;
  public employees: any;
  public statusList : any;
  public taskStatus : object[];
  public projectNameInput: any;
  // @Input('projName') projName;
  constructor( private _DataService : DataService,
               private snackbar: MatSnackBar,
               private dialogRef : MatDialogRef<TaskPopupComponent>,
               @Inject(MAT_DIALOG_DATA) public data : any ) { }
              

  ngOnInit() {
    // this.projectNameInput = this.data.projectsName;
    this.getEmployee();
    this.getStatus();
    this.addTaskForm = new FormGroup({
      id: new FormControl(this.data.id),
      projectsName: new FormControl(this.data.projectsName),
      moduleName: new FormControl(this.data.moduleName,[Validators.required]),
      employeeName: new FormControl(this.data.employeeName,[Validators.required]),
      status: new FormControl(this.data.status,[Validators.required]), 
      date: new FormControl(this.data.date,[Validators.required]),
      estimatedEndDate: new FormControl(this.data.estimatedEndDate,[Validators.required]),
      note: new FormControl(this.data.note,[Validators.required]),
    });
  };
  onClose(){
      this.dialogRef.close();
  };
  onClear(){
      this.addTaskForm.reset();
  };
  getEmployee(){
    let url = "employees";
    this._DataService.getServerData(url).subscribe(results=>{
      this.employees = results;
      // console.log(results);
    })
  };
  onSubmit(data){
          let url = "projectsName/save";
          this._DataService.addData(url,data).subscribe(result=>{
              this.snackbar.open("Task added successfully","OK",{
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
