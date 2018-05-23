import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Marche } from "../model/model.marche";
import { InputMarche } from "../model/model.inputMarche";
import { CommonService } from "./common.service";


@Injectable()
export class MarcheService extends CommonService{
   constructor(public http:Http){
    super();
   }
   
   getMarches(){
    return this.http.get(this.backEndUrl +"/marche/getAllMarches", this.options)
    .map(resp=>resp.json());
   }

   getMarchesByProjetId(idProjet:number, page:number){
    return this.http.get(this.backEndUrl +"/marche/projet?idProjet="+idProjet+"&page="+page, this.options)
    .map(resp=>resp.json());
   }

   getMarchesParPage(page:number){
    return this.http.get(this.backEndUrl +"/marche/getAllMarches?page="+page, this.options)
    .map(resp=>resp.json());
   }

   getMarche(id:number){
    return this.http.get(this.backEndUrl +"/marche/"+id, this.options)
    .map(resp=>resp.json());
   }

   ajouterMarche(marche:InputMarche){
       console.log(marche);
    return this.http.post(this.backEndUrl +"/marche/ajout",marche, this.options)
    .map(resp=>resp);
   }

    updateMarche(marche:Marche){
    return this.http.put(this.backEndUrl +"/marche/"+marche.idMarche,marche, this.options)
    .map(resp=>resp.json());
   }

   deleteMarche(id:number){
    return this.http.delete(this.backEndUrl +"/marche/"+id, this.options)
    .map(resp=>resp.json());
}

    chercherMarche(numeroMarche:string,idProjet:number){
        return this.http.get(this.backEndUrl +"/marche/numero?name="+numeroMarche+"&idProjet="+idProjet, this.options)
        .map(resp=>resp.json());

    }
    getNatures(){
        return this.http.get(this.backEndUrl +"/adminNature/allNatures", this.options)
        .map(resp=>resp.json());
    }
    
    getEntreprises(){
        return this.http.get(this.backEndUrl +"/entreprise/entreprises", this.options)
        .map(resp=>resp.json());
    }

    getMarchesParProjet(id:number){
        return this.http.get(this.backEndUrl +"/marche/projet/"+id, this.options)
        .map(resp=>resp.json());
    }
}