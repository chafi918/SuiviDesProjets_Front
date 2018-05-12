import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Utilisateur } from "../model/model.user";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./common.service";
import {JwtHelper}  from 'angular2-jwt'
@Injectable()
export class LoginService extends CommonService {
   constructor(public http:HttpClient){
    super();
   }

   login(utilisateur:Utilisateur){
     return this.http.post("http://localhost:8080/login", utilisateur, {observe: 'response'})
   }

   logout(){
       this.jwtToken=null;
       this.profil=null;
       this.isLogged=false;
       this.options=null;
       localStorage.removeItem('token');
   }

   saveToken(jwtToken:string){
    localStorage.setItem('token', jwtToken);
    let jwtHelper = new JwtHelper();
    this.profil = jwtHelper.decodeToken(jwtToken).profil;
    this.isLogged = true;
    console.log(this.profil[0].authority);
   }

   isAdmin(){
       console.log("isAdmin: " + this.profil[0].authority);
       return this.profil[0].authority == "ADMIN";
   }
}