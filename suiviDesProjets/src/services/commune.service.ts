import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Commune } from "../model/model.commune";
import { CommonService } from "./common.service";

@Injectable()
export class CommuneService extends CommonService{
   constructor(public http:Http){
    super();
   }
   getCommunes(){
    return this.http.get(this.backEndUrl + "/admin/getAllCommunes", this.options)
    .map(resp=>resp.json());
   }

   getCommunesParPage(page:number){
    return this.http.get(this.backEndUrl + "/admin/getAllCommunes?page="+page, this.options)
    .map(resp=>resp.json());
   }

   getCommune(id:number){
    return this.http.get(this.backEndUrl +"/admin/commune/"+id, this.options)
    .map(resp=>resp.json());
   }

   ajouterCommune(commune:Commune){
    return this.http.post(this.backEndUrl +"/admin/commune",commune, this.options)
    .map(resp=>resp);
   }

    updateCommune(commune:Commune){
    return this.http.put(this.backEndUrl +"/admin/updateCommune/"+commune.idCommune,commune, this.options)
    .map(resp=>resp.json());
   }

   deleteCommune(id:number){
    return this.http.delete(this.backEndUrl +"/admin/deleteCommune/"+id, this.options)
    .map(resp=>resp.json());
}

    chercherCommune(libelleCommune:string){
        return this.http.get(this.backEndUrl +"/admin/communeBN?name="+libelleCommune, this.options)
        .map(resp=>resp.json());

    }
}