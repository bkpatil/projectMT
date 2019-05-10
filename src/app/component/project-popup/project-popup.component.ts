import { Component, OnInit,Inject } from '@angular/core';
import { DataService } from "../../service/data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { FormGroup,FormControl,Validators } from "@angular/forms";
@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.css']
})
export class ProjectPopupComponent implements OnInit {
  projectForm: FormGroup;
  constructor( private _DataService : DataService,
               private SnackBar : MatSnackBar,
               public dialoRef : MatDialogRef<ProjectPopupComponent>,
               @Inject(MAT_DIALOG_DATA) public data:any ) { }

  ngOnInit() {
      this.projectForm = new FormGroup({
        id: new FormControl(this.data.id),
        projectName : new FormControl(this.data.projectName,[Validators.required])
    })
  };
  onClose(){
      this.dialoRef.close();
  };
  onClear(){
      this.projectForm.reset();
  }
  onSubmit(data){
      if(!this.data.id){
          let url = "projects";
          this._DataService.addData(url,data).subscribe(result=>{
             this.SnackBar.open("Project added successfully","OK",{
                duration: 5000
             })
             this.onClose();
          })
      }else{
        let url = "customerDetails/"+data.id;
        this._DataService.updateData(url,data).subscribe(result=>{
            this.SnackBar.open("Project updated successfully","OK",{
               duration: 5000
            });
        })
        this.onClose();
      }
  }
}
