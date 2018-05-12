import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Commune } from "../model/model.commune";

@Injectable()
export class CommuneService{
   constructor(public http:Http){

   }
   
   getCommunes(){
    return this.http.get("http://localhost:8080/admin/getAllCommunes")
    .map(resp=>resp.json());
   }

   getCommunesParPage(page:number){
    return this.http.get("http://localhost:8080/admin/getAllCommunes?page="+page)
    .map(resp=>resp.json());
   }

   getCommune(id:number){
    return this.http.get("http://localhost:8080/admin/commune/"+id)
    .map(resp=>resp.json());
   }

   ajouterCommune(commune:Commune){
    return this.http.post("http://localhost:8080/admin/commune",commune)
    .map(resp=>resp);
   }

    updateCommune(commune:Commune){
    return this.http.put("http://localhost:8080/admin/updateCommune/"+commune.idCommune,commune)
    .map(resp=>resp.json());
   }

   deleteCommune(id:number){
    return this.http.delete("http://localhost:8080/admin/deleteCommune/"+id)
    .map(resp=>resp.json());
}

    chercherCommune(libelleCommune:string){
        return this.http.get("http://localhost:8080/admin/communeBN?name="+libelleCommune)
        .map(resp=>resp.json());

    }
}