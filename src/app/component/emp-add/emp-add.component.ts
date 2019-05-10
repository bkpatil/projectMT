import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from "../../service/data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.css']
})
export class EmpAddComponent implements OnInit {
  addEmployeeForm: FormGroup;
  private editForm:boolean = false;
  constructor( private _DataService : DataService,
               private snackbar: MatSnackBar,
               private dialogRef : MatDialogRef<EmpAddComponent>,
               @Inject(MAT_DIALOG_DATA) public data : any ) { }

  ngOnInit() {
      this.addEmployeeForm = new FormGroup({
          id: new FormControl(this.data.id),
          name: new FormControl(this.data.name,[Validators.required]),
          mobileNo: new FormControl(this.data.mobileNo,[Validators.required]),
          email: new FormControl(this.data.email,[Validators.required,Validators.email]),
          position: new FormControl(this.data.position,[Validators.required]),
          userName: new FormControl(this.data.userName,[Validators.required]),
          password: new FormControl(this.data.password,[Validators.required]),
          confirmPassword: new FormControl(this.data.confirmPassword,[Validators.required]),

    })
  };
  onClose(){
      this.dialogRef.close();
  };
  onClear(){
      this.addEmployeeForm.reset();
  };
  onSubmit(data){
          let url = "addEmployee";
          this._DataService.addData(url,data).subscribe(result=>{
              this.snackbar.open("Employee added successfully","OK",{
                  duration: 5000
          })
          this.onClose();
        })
      }  
}
