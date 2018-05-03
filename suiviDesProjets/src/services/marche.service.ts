import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Marche } from "../model/model.marche";
import { InputMarche } from "../model/model.inputMarche";


@Injectable()
export class MarcheService{
   constructor(public http:Http){

   }
   
   getMarches(){
    return this.http.get("http://localhost:8080/marche/getAllMarches")
    .map(resp=>resp.json());
   }

   getMarchesByProjetId(idProjet:number, page:number){
    return this.http.get("http://localhost:8080/marche/projet?idProjet="+idProjet+"&page="+page)
    .map(resp=>resp.json());
   }

   getMarchesParPage(page:number){
    return this.http.get("http://localhost:8080/marche/getAllMarches?page="+page)
    .map(resp=>resp.json());
   }

   getMarche(id:number){
    return this.http.get("http://localhost:8080/marche/"+id)
    .map(resp=>resp.json());
   }

   ajouterMarche(marche:InputMarche){
       console.log(marche);
    return this.http.post("http://localhost:8080/marche/ajout",marche)
    .map(resp=>resp);
   }

    updateMarche(marche:Marche){
    return this.http.put("http://localhost:8080/marche/"+marche.idMarche,marche)
    .map(resp=>resp.json());
   }

   deleteMarche(id:number){
    return this.http.delete("http://localhost:8080/marche/"+id)
    .map(resp=>resp.json());
}

    chercherMarche(numeroMarche:string,idProjet:number){
        return this.http.get("http://localhost:8080/marche/numero?name="+numeroMarche+"&idProjet="+idProjet)
        .map(resp=>resp.json());

    }
    getNatures(){
        return this.http.get("http://localhost:8080/adminNature/allNatures")
        .map(resp=>resp.json());
    }
    
    getEntreprises(){
        return this.http.get("http://localhost:8080/entreprise/entreprises")
        .map(resp=>resp.json());
    }

    getMarchesParProjet(id:number){
        return this.http.get("http://localhost:8080/marche/projet/"+id)
        .map(resp=>resp.json());
    }
}