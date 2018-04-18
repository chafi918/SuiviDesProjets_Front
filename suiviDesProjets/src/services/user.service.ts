import { Injectable, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { Utilisateur } from "../model/model.user";

@Injectable()
export class UserService{
   constructor(public http:Http){

   }
 
   getUsers(){
    return this.http.get("http://localhost:8080/users/getAllUtilisateurs")
    .map(resp=>resp.json());
   }
   

   getAllDivisions(){
    return this.http.get("http://localhost:8080/division/divisions")
    .map(resp=>resp.json());
    }

    getAllProfils(){
        return this.http.get("http://localhost:8080/adminProfil/profils")
        .map(resp=>resp.json());
        }

    ajouterUser(utilisateur:Utilisateur){
        return this.http.post("http://localhost:8080/users/ajout",utilisateur)
        .map(resp=>resp);
       }

    getUser(id:number){
        return this.http.get("http://localhost:8080/users/user/"+id)
        .map(resp=>resp.json());
       }

    updateUser(utilisateur:Utilisateur){
        return this.http.put("http://localhost:8080/users/"+utilisateur.idUser,utilisateur)
        .map(resp=>resp.json());
       }

       deleteUser(id:number){
        return this.http.delete("http://localhost:8080/users/"+id)
        .map(resp=>resp.json());
       }
       
        chercherUserParMotCle(motCle:string){
            return this.http.get("http://localhost:8080/users/getParMotCle/?motCle="+motCle)
            .map(resp=>resp.json());
       
        }
}