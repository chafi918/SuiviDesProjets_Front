import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class ProjetService{
   constructor(public http:Http){

   }
   
   getProjets(){
    return this.http.get("http://localhost:8080/projet/getProjets")
    .map(resp=>resp.json());
   }

   getProjetsParPage(page:number){
    return this.http.get("http://localhost:8080/projet/getProjets?page="+page)
    .map(resp=>resp.json());
   }
}