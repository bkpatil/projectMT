import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EmployeePopupComponent } from "../../../component/emp-list/employee-popup.component";
import { NotificationComponent } from "../../../component/notification/notification.component";
import { MatDialog,MatSort, MatSnackBar,MatTableDataSource} from "@angular/material";
import { Router } from "@angular/router";
import { DataService } from "../../../service/data.service";
import { DeletePopupService } from "../../../service/delete-popup.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from "../../../modal/login";
@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent {
  userName: any;
  password: any; 
  user: any;
  data: any;
  onLoginEmpDetails: any;
  selectedProject: any;
  changeText: boolean= true;
  private employeeList: any;
  loginUser: Login[];
  public taskLength: any;
  public projectNameCount: any;
  public projectNameList: MatTableDataSource<any>;
  private projectById: Object = {};
  displayedColumns: string[]=['title','action','demo'];
  public projName: any = JSON;
  public projectsDetails: MatTableDataSource<any>;
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
        this.getEmployee();
    
    };
    getProjectsName(){
        let userName = localStorage.getItem('userName');      
        let url = "Projects/EmployeeProjects/"+userName;
        this._DataService.getServerData(url).subscribe(result=>{
        this.projectNameList = new MatTableDataSource(result);
        this.projectNameCount = this.projectNameList.data.length;
        })
    };
    getEmployee(){
        let url = "employees";
        this._DataService.getServerData(url).subscribe(result=>{
            this.employeeList = new MatTableDataSource(result);
          
        })
    };
    getProjectById(id){
        let url = "customer"+id;
        this._DataService.getProjectById(url).subscribe(result=>{
        this.projectById = result;
        })
    };
    onSelect(projectName){
        let url = "Projects/"+projectName;
        this._DataService.getServerData(url).subscribe(result=>{
            this.projName = result;
            this.projectsDetails = new MatTableDataSource(this.projName['projectDetails']);
        //   this.taskLength = this.projectsDetails.data.length;
        })
    };
    openEmployeeModal(){
        const dialogRef = this.dialog.open(EmployeePopupComponent,{
            width: "50%",
            autoFocus: true,
            data: {},
            position: {top: '5%', left: '50%' },
        })
    };
    notification(){
        const dialogRef = this.dialog.open(NotificationComponent,{
            width: "50%",
            position: { top: "5%",left: '50%' },
            data: {}
        })
    };
    logout(){
        localStorage.getItem('userName');
        localStorage.removeItem('userName');
        this.router.navigateByUrl('/');
    }
};
