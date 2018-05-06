import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { Projet } from "../model/model.projet";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProjetService{
   constructor(public http:Http){

   }
    public idProjetSubject = new Subject<number>();
    
   getProjets(){
    return this.http.get("http://localhost:8080/projet/getProjets")
    .map(resp=>resp.json());
   }

     
   getProjet(id:number){
       console.log("fromService idProjet = " + id);
    return this.http.get("http://localhost:8080/projet/"+id)
    .map(resp=>resp.json());
   }

   getProjetsParPage(page:number){
    return this.http.get("http://localhost:8080/projet/getProjets?page="+page)
    .map(resp=>resp.json());
   }

   ajouterProjet(projet:Projet){
    return this.http.post("http://localhost:8080/projet/ajout",projet)
    .map(resp=>resp);
   }

   getAllStatuts(){
    return this.http.get("http://localhost:8080/admin/statuts")
    .map(resp=>resp.json());
    }

    getAllSecteurs(){
        return this.http.get("http://localhost:8080/admin/secteurs")
        .map(resp=>resp.json());
    }

    updateProjet(projet:Projet){
        return this.http.put("http://localhost:8080/projet/"+projet.idProjet,projet)
        .map(resp=>resp.json());
    }

    deleteProjet(id:number){
        return this.http.delete("http://localhost:8080/projet/"+id)
        .map(resp=>resp.json());
       }
}