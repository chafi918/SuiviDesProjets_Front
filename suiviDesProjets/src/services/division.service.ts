import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Division } from "../model/model.division";
import { CommonService } from "./common.service";

@Injectable()
export class DivisionService extends CommonService{
   constructor(public http:Http){
    super();
   }
   
   getDivisions(){
       console.log("getDivision")
    return this.http.get(this.backEndUrl +"/division/getDivision", this.options)
    .map(resp=>resp.json());
   }

   getDivisionsParPage(page:number){
    return this.http.get(this.backEndUrl +"/division/getDivision?page="+page, this.options)
    .map(resp=>resp.json());
   }

   getDivision(id:number){
    return this.http.get(this.backEndUrl +"/division/"+id, this.options)
    .map(resp=>resp.json());
   }

   ajouterDivision(division:Division){
    return this.http.post(this.backEndUrl +"/division/ajout",division, this.options)
    .map(resp=>resp);
   }

    updateDivision(division:Division){
    return this.http.put(this.backEndUrl +"/division/"+division.idDivision,division, this.options)
    .map(resp=>resp.json());
   }

   deleteDivision(id:number){
    return this.http.delete(this.backEndUrl +"/division/"+id, this.options)
    .map(resp=>resp.json());
}

    chercherDivision(libelleDivision:string){
        return this.http.get(this.backEndUrl +"/division/getDivisionsByName?name="+libelleDivision, this.options)
        .map(resp=>resp.json());

    }
}