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
 return this.http.get(this.backEndUrl +"/admin/getAllSecteurs", this.options)
 .map(resp=>resp.json());
}

getSecteursParPage(page:number){
 return this.http.get(this.backEndUrl +"/admin/getAllSecteurs?page="+page, this.options)
 .map(resp=>resp.json());
}

getSecteur(id:number){
 return this.http.get(this.backEndUrl +"/admin/secteur/"+id, this.options)
 .map(resp=>resp.json());
}

ajouterSecteur(secteur:Secteur){
 return this.http.post(this.backEndUrl +"/admin/secteur",secteur, this.options)
 .map(resp=>resp);
}

 updateSecteur(secteur:Secteur){
 return this.http.put(this.backEndUrl +"/admin/secteurs/"+secteur.idSecteur,secteur, this.options)
 .map(resp=>resp.json());
}

deleteSecteur(id:number){
 return this.http.delete(this.backEndUrl +"/admin/secteurs/"+id, this.options)
 .map(resp=>resp.json());
}

 chercherSecteur(libelleSecteur:string){
     return this.http.get(this.backEndUrl +"/admin/secteurBN/?name="+libelleSecteur, this.options)
     .map(resp=>resp.json());

 }
 chercherSecteurByProjet(idProjet:number){
    return this.http.get(this.backEndUrl +"/admin/secteur/?idProjet="+idProjet, this.options)
    .map(resp=>resp.json());
 }
}