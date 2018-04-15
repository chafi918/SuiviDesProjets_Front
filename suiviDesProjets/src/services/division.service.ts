import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Division } from "../model/model.division";

@Injectable()
export class DivisionService{
   constructor(public http:Http){

   }
   
   getDivisions(){
       console.log("getDivision")
    return this.http.get("http://localhost:8080/division/getDivision")
    .map(resp=>resp.json());
   }

   getDivisionsParPage(page:number){
    return this.http.get("http://localhost:8080/division/getDivision?page="+page)
    .map(resp=>resp.json());
   }

   getDivision(id:number){
    return this.http.get("http://localhost:8080/division/"+id)
    .map(resp=>resp.json());
   }

   ajouterDivision(division:Division){
    return this.http.post("http://localhost:8080/division/ajout",division)
    .map(resp=>resp);
   }

    updateDivision(division:Division){
    return this.http.put("http://localhost:8080/division/"+division.idDivision,division)
    .map(resp=>resp.json());
   }

   deleteDivision(id:number){
    return this.http.delete("http://localhost:8080/division/"+id)
    .map(resp=>resp.json());
}

    chercherDivision(libelleDivision:string){
        return this.http.get("http://localhost:8080/division/getDivisionsByName?name="+libelleDivision)
        .map(resp=>resp.json());

    }
}