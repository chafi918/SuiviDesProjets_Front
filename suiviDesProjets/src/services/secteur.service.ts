import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Secteur } from "../model/model.secteur";
import { CommonService } from "./common.service";

@Injectable()
export class SecteurService extends CommonService{
    constructor(public http:Http){
        super();
    }
       
getSecteurs(){
 return this.http.get("http://localhost:8080/admin/getAllSecteurs", this.options)
 .map(resp=>resp.json());
}

getSecteursParPage(page:number){
 return this.http.get("http://localhost:8080/admin/getAllSecteurs?page="+page, this.options)
 .map(resp=>resp.json());
}

getSecteur(id:number){
 return this.http.get("http://localhost:8080/admin/secteur/"+id, this.options)
 .map(resp=>resp.json());
}

ajouterSecteur(secteur:Secteur){
 return this.http.post("http://localhost:8080/admin/secteur",secteur, this.options)
 .map(resp=>resp);
}

 updateSecteur(secteur:Secteur){
 return this.http.put("http://localhost:8080/admin/secteurs/"+secteur.idSecteur,secteur, this.options)
 .map(resp=>resp.json());
}

deleteSecteur(id:number){
 return this.http.delete("http://localhost:8080/admin/secteurs/"+id, this.options)
 .map(resp=>resp.json());
}

 chercherSecteur(libelleSecteur:string){
     return this.http.get("http://localhost:8080/admin/secteurBN/?name="+libelleSecteur, this.options)
     .map(resp=>resp.json());

 }
 chercherSecteurByProjet(idProjet:number){
    return this.http.get("http://localhost:8080/admin/secteur/?idProjet="+idProjet, this.options)
    .map(resp=>resp.json());
 }
}