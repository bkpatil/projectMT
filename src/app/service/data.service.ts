import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Login } from "../modal/login";
@Injectable({
  providedIn: 'root'
})
export class DataService {
    private commonUrl = "http://13.233.245.139:8080/projectmanagement/v1.0/";
    public user : any;
    constructor( private _HttpClient : HttpClient,
                 private router : Router,
                 private snackbar : MatSnackBar ) { }
  
    signUp(data): any{
        let url = "users/save";
        this._HttpClient.post(this.commonUrl + url,data).subscribe(response=>{
            this.snackbar.open("Register Successfully","OK",{
            duration: 5000
            })
            this.router.navigateByUrl('/main');
        });
    };
    login(details):any{
        let url = "users/"+details.username+"/users/"+details.password;
        this.user = details.userName;
        return this._HttpClient.get<Login>(this.commonUrl + url).subscribe(results=>{
            this.user = results.userName;
            
            localStorage.setItem("userName",this.user);
            debugger;
            if(results.designation.match("ADMIN")){
                this.router.navigateByUrl('/main');
            }else{
                this.router.navigateByUrl('/emp-dash');
            }
            this.snackbar.open("Login Successfully","OK",{
                duration: 5000
            })
        },(error: HttpErrorResponse)=>{
            if(error.error instanceof Error){
                console.log("client side error")
            }else{
                this.snackbar.open("Invalid User...!","OK",{
                    duration: 5000
                })
            }
        })       
    };
  reset(details):any{
      let url = "forgetPassword";
      return this._HttpClient.put(this.commonUrl + url, details);
    };
    // logout(){
    //     let url = "logout/"+this.user;
    //     debugger
    //     return this._HttpClient.get(this.commonUrl + url).subscribe(results=>{
    //         this.snackbar.open("Logout successfully","OK",{
    //             duration: 5000
    //         })
    //         this.router.navigateByUrl("/");
    //     })
    // };
  getServerData(url):any{
      return this._HttpClient.get(this.commonUrl + url);
  };
  addData(url,data:any):any{
      return this._HttpClient.post(this.commonUrl + url, data);
  };
  getProjectById(url):any{
      return this._HttpClient.get(this.commonUrl + url);
  };
  updateData(url,data:any):any{
      return this._HttpClient.put(this.commonUrl +  url,data);
  };
  deleteData(url):any{
      return this._HttpClient.delete(this.commonUrl + url);
  };
  
}
