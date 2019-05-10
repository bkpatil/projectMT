import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material.module";
import { MainComponent } from './component/main/main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ProjectPopupComponent } from './component/project-popup/project-popup.component';
import { ListComponent } from './component/list/list.component';
import { TaskPopupComponent } from './component/task-popup/task-popup.component';
import { DataService } from "./service/data.service";
import { DeletePopupService } from "./service/delete-popup.service";
import { EmployeePopupComponent } from "./component/emp-list/employee-popup.component";
import { EmpAddComponent } from './component/emp-add/emp-add.component';
import { DeletePopupComponent } from './component/delete-popup/delete-popup.component';
import { StatusPopupComponent } from './component/status-popup/status-popup.component';
import { NotificationComponent } from './component/notification/notification.component';
import { EmpTaskListComponent } from './module/employee/emp-task-list/emp-task-list.component';
import { EmpDashboardComponent } from './module/employee/emp-dashboard/emp-dashboard.component';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { PopEmpTaskComponent } from "./module/employee/edit-status/pop-emp-task.component";
import { EmpEditComponent } from './component/emp-edit/emp-edit.component';
import { TeskEditPopupComponent } from './component/tesk-edit-popup/tesk-edit-popup.component';
import { AddTaskPopupComponent } from "./module/employee/add-task-popup/add-task-popup.component"; 
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    ProjectPopupComponent,
    ListComponent,
    TaskPopupComponent,
    EmployeePopupComponent,
    EmpAddComponent,
    DeletePopupComponent,
    StatusPopupComponent,
    NotificationComponent,
    EmpTaskListComponent,
    EmpDashboardComponent,
    PopEmpTaskComponent,
    EmpEditComponent,
    TeskEditPopupComponent,
    AddTaskPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [ DataService,DeletePopupService ],
  bootstrap: [ AppComponent ],
  entryComponents: [ 
    ProjectPopupComponent,
    TaskPopupComponent,
    TeskEditPopupComponent,
    EmployeePopupComponent,
    AddTaskPopupComponent,
    StatusPopupComponent,
    DeletePopupComponent,
    NotificationComponent,
    EmpAddComponent,
    EmpEditComponent,
    PopEmpTaskComponent
  ],
  schemas:[
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
