import { Component,OnInit, Input,ViewChild,OnChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProjectPopupComponent } from "../project-popup/project-popup.component";
import { EmployeePopupComponent } from "../emp-list/employee-popup.component";
import { NotificationComponent } from "../notification/notification.component";
import { MatDialog,MatSort, MatSnackBar,MatTableDataSource} from "@angular/material";
import { DataService } from "../../service/data.service";
import { Router } from "@angular/router";
import { DeletePopupService } from "../../service/delete-popup.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  userName: any;
  password: any; 
  user: any;
  data: any;
  selectedProject: any;
  public showCommont : any;
  changeText: boolean= true;
  public projectNameCount: any;
  private notification: any;
  public notificationCount : any;
  public notificationList: MatTableDataSource<any>;
  public projectNameList: MatTableDataSource<any>;
  public projectById: Object = {};
  displayedColumns: string[]=['title','demo', 'action']
  public projName: any = JSON;
  public projectsDetails: MatTableDataSource<any>;
  
  @ViewChild(MatSort) sort: MatSort;
  constructor( private breakpointObserver: BreakpointObserver,
               private _DeletePopupService: DeletePopupService,
               private snackbar: MatSnackBar,
               private router : Router,
               public dialog : MatDialog,
               private _DataService : DataService ) {}

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
        map(result => result.matches)
    );
  
    ngOnInit(){
        this.getProjectsName();
        this.getNotification();
    //   this.logout();
    };
    getProjectsName(){
        let url = "projectsDetails";
        this._DataService.getServerData(url).subscribe(result=>{
        this.projectNameList = new MatTableDataSource(result);
        this.projectNameCount = this.projectNameList.data.length;
        })
    };
    getProjectById(id){
        let url = "customer"+id;
        this._DataService.getProjectById(url).subscribe(result=>{
        this.projectById = result;
        })
    };
    createProject(){
        const dialogRef = this.dialog.open(ProjectPopupComponent,{
            width: "350px",
            panelClass: "project-popup",
            autoFocus: true,
            position: {top: '15%', left: '17.5%' },
            data : {}
        })
        dialogRef.afterClosed().subscribe((result)=>{
            this.getProjectsName();
        })
    };
    editProjectName(id){
        var project = this.projectNameList.data.find(x => x.id == id)
        const dialogRef = this.dialog.open(ProjectPopupComponent,{
            width: "350px",
            autoFocus: true,
            position: { top: "15%",left: "17%"},
            data: project
        })
        dialogRef.afterClosed().subscribe((result)=>{
            this.getProjectsName();
        })
    };
    deleteProjectName(id){
        this._DeletePopupService.openDeleteDialog("Are you sure delete this?").afterClosed().subscribe(result=>{
            if(result){
            var obj={
                id: id
            }
            let url = "customerDetails/"+obj.id;
            this._DataService.deleteData(url).subscribe(()=>{
            this.snackbar.open("Project deleted successfully","OK",{
                duration: 5000
            })
            this.getProjectsName();
            })
            }
        });
    }
    onSelect(projectName){
        let url = "projectsName/projectDetails/"+projectName;
      // debugger; 
        this._DataService.getServerData(url).subscribe(result=>{
            this.projName = result;
            this.projectsDetails = new MatTableDataSource(this.projName['projectDetails']);
    })
    };
    openEmployeeModal(){
        const dialogRef = this.dialog.open(EmployeePopupComponent,{
            width: "80%",
            autoFocus: true,
            data: {},
            position: {top: '4.5%'},
        })
    };
    notificationOpen(){
        const dialogRef = this.dialog.open(NotificationComponent,{
            width: "80%",
            position: { top: "4.5%" },
            data: {}
        })
    };
    logout(){
        localStorage.getItem('userName');
        localStorage.removeItem('userName');
        this.router.navigateByUrl('/');
    };
    getNotification(){
        let  url = "Projects/assignProjects";
        this._DataService.getServerData(url).subscribe(result=>{
            this.notification = result;
            this.notificationList = new MatTableDataSource(this.notification);
            this.notificationCount = this.notificationList.data.length;
            // debugger
        })
    }
}
