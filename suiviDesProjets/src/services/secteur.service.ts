import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Secteur } from "../model/model.secteur";

@Injectable()
export class SecteurService{
    constructor(public http:Http){

    }
       
getSecteurs(){
 return this.http.get("http://localhost:8080/admin/getAllSecteurs")
 .map(resp=>resp.json());
}

getSecteursParPage(page:number){
 return this.http.get("http://localhost:8080/admin/getAllSecteurs?page="+page)
 .map(resp=>resp.json());
}

getSecteur(id:number){
 return this.http.get("http://localhost:8080/admin/secteur/"+id)
 .map(resp=>resp.json());
}

ajouterSecteur(secteur:Secteur){
 return this.http.post("http://localhost:8080/admin/secteur",secteur)
 .map(resp=>resp);
}

 updateSecteur(secteur:Secteur){
 return this.http.put("http://localhost:8080/admin/secteurs/"+secteur.idSecteur,secteur)
 .map(resp=>resp.json());
}

deleteSecteur(id:number){
 return this.http.delete("http://localhost:8080/admin/secteurs/"+id)
 .map(resp=>resp.json());
}

 chercherSecteur(libelleSecteur:string){
     return this.http.get("http://localhost:8080/admin/secteurBN/?name="+libelleSecteur)
     .map(resp=>resp.json());

 }
 chercherSecteurByProjet(idProjet:number){
    return this.http.get("http://localhost:8080/admin/secteur/?idProjet="+idProjet)
    .map(resp=>resp.json());
 }
}