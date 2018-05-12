import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Entreprise } from "../model/model.entreprise";
import { InputEntreprise } from "../model/model.inputEntreprise";
import { CommonService } from "./common.service";


@Injectable()
export class EntrepriseService extends CommonService{
   constructor(public http:Http){
    super();
   }
   
   getEntrepriseParMarche(idMarche:any){
    return this.http.get("http://localhost:8080/marche/entrepriseBM/"+idMarche, this.options)
    .map(resp=>resp.json());
   }
   getEntreprises(){
    return this.http.get("http://localhost:8080/entreprise/getEntreprises", this.options)
    .map(resp=>resp.json());
   }

   getEntreprisesParPage(page:number){
    return this.http.get("http://localhost:8080/entreprise/getEntreprises?page="+page, this.options)
    .map(resp=>resp.json());
   }

   getEntreprise(id:number){
    return this.http.get("http://localhost:8080/entreprise/"+id, this.options)
    .map(resp=>resp.json());
   }

   ajouterEntreprise(entreprise:InputEntreprise){
    return this.http.post("http://localhost:8080/entreprise/ajout",entreprise, this.options)
    .map(resp=>resp);
   }
   ajoutEntreprise(entreprise:Entreprise){
    return this.http.post("http://localhost:8080/entreprise/ajout",entreprise, this.options)
    .map(resp=>resp);
   }

    updateEntreprise(entreprise:Entreprise){
    return this.http.put("http://localhost:8080/entreprise/"+entreprise.idEntreprise,entreprise, this.options)
    .map(resp=>resp.json());
   }

   deleteEntreprise(id:number){
    return this.http.delete("http://localhost:8080/entreprise/"+id, this.options)
    .map(resp=>resp.json());
}

    chercherEntreprise(nomEntreprise:string){
        return this.http.get("http://localhost:8080/entreprise/entreprises/name?name="+nomEntreprise, this.options)
        .map(resp=>resp.json());

    }
}