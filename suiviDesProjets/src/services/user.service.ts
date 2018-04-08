import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class UserService{
   constructor(public http:Http){

   }
   
   getUsers(){
    return this.http.get("http://localhost:8080/users/getAllUtilisateurs")
    .map(resp=>resp.json());
   }
}