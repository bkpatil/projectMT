import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./component/login/login.component";
import { SignupComponent } from "./component/signup/signup.component";
import { MainComponent } from "./component/main/main.component";
import { EmpDashboardComponent } from "./module/employee/emp-dashboard/emp-dashboard.component";
const routes: Routes = [
  { path: "" , component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "main", component: MainComponent },
  { path: "emp-dash", component: EmpDashboardComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
