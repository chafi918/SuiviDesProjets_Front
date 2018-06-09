import { Injectable, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { Utilisateur } from "../model/model.user";
import { CommonService } from "./common.service";

@Injectable()
export class UserService extends CommonService{
   constructor(public http:Http){
    super();
   }
 
   getUsers(){
    return this.http.get(this.backEndUrl +"/users/getAllUtilisateurs", this.options)
    .map(resp=>resp.json());
   }
   
   getUsersParPage(page:number){
    return this.http.get(this.backEndUrl +"/users/getAllUtilisateurs?page="+page, this.options)
    .map(resp=>resp.json());
   }

   getAllDivisions(){
    return this.http.get(this.backEndUrl +"/division/divisions", this.options)
    .map(resp=>resp.json());
    }

    getAllProfils(){
        return this.http.get(this.backEndUrl +"/adminProfil/profils", this.options)
        .map(resp=>resp.json());
        }

    ajouterUser(utilisateur:Utilisateur){
        return this.http.post(this.backEndUrl +"/users/ajout",utilisateur, this.options)
        .map(resp=>resp);
       }

    getUser(id:number){
        return this.http.get(this.backEndUrl +"/users/user/"+id, this.options)
        .map(resp=>resp.json());
       }

    updateUser(utilisateur:Utilisateur){
        return this.http.put(this.backEndUrl +"/users/"+utilisateur.idUser,utilisateur, this.options)
        .map(resp=>resp);
       }

       deleteUser(id:number){
        return this.http.delete(this.backEndUrl +"/users/"+id, this.options)
        .map(resp=>resp.json());
       }
       
        chercherUserParMotCle(motCle:string){
            return this.http.get(this.backEndUrl +"/users/getParMotCle/?motCle="+motCle, this.options)
            .map(resp=>resp.json());
       
        }
}