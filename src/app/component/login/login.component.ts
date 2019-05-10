import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { DataService } from "../../service/data.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup;
  showNew: boolean = false;
  userName: any;
  password: any;
  confirmPassword: any;
  constructor( private _DataService : DataService,
               private router : Router ) { }

  ngOnInit() {
  };

  onLogin(){
  let details = {
    username : this.userName,
    password : this.password
  };
  this._DataService.login(details)
  };
  onReset(){
    let details = {
      userName : this.userName,
      password : this.password,
      confirmPassword : this.confirmPassword
    };    
    this._DataService.reset(details) 
  };
}
