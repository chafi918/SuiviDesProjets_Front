import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Entreprise } from "../model/model.entreprise";


@Injectable()
export class EntrepriseService{
   constructor(public http:Http){

   }
   
   getEntreprises(){
    return this.http.get("http://localhost:8080/entreprise/getEntreprises")
    .map(resp=>resp.json());
   }

   getEntreprisesParPage(page:number){
    return this.http.get("http://localhost:8080/entreprise/getEntreprises?page="+page)
    .map(resp=>resp.json());
   }

   getEntreprise(id:number){
    return this.http.get("http://localhost:8080/entreprise/"+id)
    .map(resp=>resp.json());
   }

   ajouterEntreprise(entreprise:Entreprise){
    return this.http.post("http://localhost:8080/entreprise/ajout",entreprise)
    .map(resp=>resp);
   }

    updateEntreprise(entreprise:Entreprise){
    return this.http.put("http://localhost:8080/entreprise/"+entreprise.idEntreprise,entreprise)
    .map(resp=>resp.json());
   }

   deleteEntreprise(id:number){
    return this.http.delete("http://localhost:8080/entreprise/"+id)
    .map(resp=>resp.json());
}

    chercherEntreprise(nomEntreprise:string){
        return this.http.get("http://localhost:8080/entreprise/entreprises/name?name="+nomEntreprise)
        .map(resp=>resp.json());

    }
}