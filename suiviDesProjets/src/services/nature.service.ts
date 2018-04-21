import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Nature } from "../model/model.nature";


@Injectable()
export class NatureService{
   constructor(public http:Http){

   }
   
   getNatures(){
    return this.http.get("http://localhost:8080/adminNature/getAllNatures")
    .map(resp=>resp.json());
   }

   getNaturesParPage(page:number){
    return this.http.get("http://localhost:8080/adminNature/getAllNatures?page="+page)
    .map(resp=>resp.json());
   }

   getNature(id:number){
    return this.http.get("http://localhost:8080/adminNature/"+id)
    .map(resp=>resp.json());
   }

   ajouterNature(nature:Nature){
    return this.http.post("http://localhost:8080/adminNature/ajout",nature)
    .map(resp=>resp);
   }

    updateNature(nature:Nature){
    return this.http.put("http://localhost:8080/adminNature/"+nature.idNature,nature)
    .map(resp=>resp.json());
   }

   deleteNature(id:number){
    return this.http.delete("http://localhost:8080/adminNature"+id)
    .map(resp=>resp.json());
}

    chercherNature(libelleNature:string){
        return this.http.get("http://localhost:8080/adminNature/name?name="+libelleNature)
        .map(resp=>resp.json());

    }
}