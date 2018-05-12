import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loged:boolean = false;
  isAdmin:boolean=false;
  constructor(public loginService:LoginService, public router:Router){
    if ( this.loginService.isLogged==false) {
      this.logout();
    }else{
      this.isAdmin = this.isAnAdmin();
      this.loged=this.isLoged();
    }
  }
  
  isLoged(){
    if (this.router.url == "/login") {
      return false;
    }
    return this.loginService.isLogged;
  }

  isAnAdmin(){
    return this.loginService.isAdmin();
  }
  logout(){
    this.loginService.logout();
    this.router.navigateByUrl("/login");
  }
}
