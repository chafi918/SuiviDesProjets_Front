import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Nature } from "../model/model.nature";
import { CommonService } from "./common.service";


@Injectable()
export class NatureService extends CommonService{
   constructor(public http:Http){
    super();
   }
   
   getNatures(){
    return this.http.get(this.backEndUrl +"/adminNature/getAllNatures", this.options)
    .map(resp=>resp.json());
   }

   getNaturesParPage(page:number){
    return this.http.get(this.backEndUrl +"/adminNature/getAllNatures?page="+page, this.options)
    .map(resp=>resp.json());
   }

   getNature(id:number){
    return this.http.get(this.backEndUrl +"/adminNature/"+id, this.options)
    .map(resp=>resp.json());
   }

   ajouterNature(nature:Nature){
    return this.http.post(this.backEndUrl +"/adminNature/ajout",nature, this.options)
    .map(resp=>resp);
   }

    updateNature(nature:Nature){
    return this.http.put(this.backEndUrl +"/adminNature/"+nature.idNature,nature, this.options)
    .map(resp=>resp.json());
   }

   deleteNature(id:number){
    return this.http.delete(this.backEndUrl +"/adminNature/"+id, this.options)
    .map(resp=>resp.json());
}

    chercherNature(libelleNature:string){
        return this.http.get(this.backEndUrl +"/adminNature/name?name="+libelleNature, this.options)
        .map(resp=>resp.json());

    }
}