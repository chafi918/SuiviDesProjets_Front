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
    return this.http.get("http://localhost:8080/marche/getAllMarches", this.options)
    .map(resp=>resp.json());
   }

   getMarchesByProjetId(idProjet:number, page:number){
    return this.http.get("http://localhost:8080/marche/projet?idProjet="+idProjet+"&page="+page, this.options)
    .map(resp=>resp.json());
   }

   getMarchesParPage(page:number){
    return this.http.get("http://localhost:8080/marche/getAllMarches?page="+page, this.options)
    .map(resp=>resp.json());
   }

   getMarche(id:number){
    return this.http.get("http://localhost:8080/marche/"+id, this.options)
    .map(resp=>resp.json());
   }

   ajouterMarche(marche:InputMarche){
       console.log(marche);
    return this.http.post("http://localhost:8080/marche/ajout",marche, this.options)
    .map(resp=>resp);
   }

    updateMarche(marche:Marche){
    return this.http.put("http://localhost:8080/marche/"+marche.idMarche,marche, this.options)
    .map(resp=>resp.json());
   }

   deleteMarche(id:number){
    return this.http.delete("http://localhost:8080/marche/"+id, this.options)
    .map(resp=>resp.json());
}

    chercherMarche(numeroMarche:string,idProjet:number){
        return this.http.get("http://localhost:8080/marche/numero?name="+numeroMarche+"&idProjet="+idProjet, this.options)
        .map(resp=>resp.json());

    }
    getNatures(){
        return this.http.get("http://localhost:8080/adminNature/allNatures", this.options)
        .map(resp=>resp.json());
    }
    
    getEntreprises(){
        return this.http.get("http://localhost:8080/entreprise/entreprises", this.options)
        .map(resp=>resp.json());
    }

    getMarchesParProjet(id:number){
        return this.http.get("http://localhost:8080/marche/projet/"+id, this.options)
        .map(resp=>resp.json());
    }
}