import { Component, OnInit, Inject, Input } from '@angular/core';
import { StatusPopupComponent } from "../status-popup/status-popup.component";
import { DataService } from "../../service/data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-tesk-edit-popup',
  templateUrl: './tesk-edit-popup.component.html',
  styleUrls: ['./tesk-edit-popup.component.css']
})
export class TeskEditPopupComponent implements OnInit {
  editTaskForm: FormGroup;
  public employees: any;
  public statusList : any;
  public taskStatus : object[];
  public projectNameInput: any;
  // @Input('projName') projName;
  constructor( private _DataService : DataService,
               private snackbar: MatSnackBar,
               private dialogRef : MatDialogRef<TeskEditPopupComponent>,
               @Inject(MAT_DIALOG_DATA) public data : any ) { }
              

  ngOnInit() {
    console.log(this.data);
    this.projectNameInput = this.data.projName;
    debugger
    this.getEmployee();
    this.getStatus();
    this.editTaskForm = new FormGroup({
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
      this.editTaskForm.reset();
  };
  getEmployee(){
    let url = "employees";
    this._DataService.getServerData(url).subscribe(results=>{
      this.employees = results;
      // console.log(results);
    })
  };
  onSubmit(data){
        let url = "projectNameDetails/"+this.data.id +"/"+data.moduleName;
        console.log(url);
          this._DataService.updateData(url,data).subscribe(result=>{
              this.snackbar.open("Task updated successfully","OK",{
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
