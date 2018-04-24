import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observation } from "../model/model.observation";
 


@Injectable()
export class ObservationService{
   constructor(public http:Http){}

   getObservations(){
    return this.http.get("http://localhost:8080/observation/getObservations")
    .map(resp=>resp.json());
   }

   getObservationsParPage(page:number){
    return this.http.get("http://localhost:8080/observation/getObservations?page="+page)
    .map(resp=>resp.json());
   }

   getObservation(id:number){
    return this.http.get("http://localhost:8080/observation/"+id)
    .map(resp=>resp.json());
   }

   ajouterObservation(observation:Observation){
    return this.http.post("http://localhost:8080/observation/ajout",observation)
    .map(resp=>resp);
   }

    updateObservation(observation:Observation){
    return this.http.put("http://localhost:8080/observation/"+observation.idObservation,observation)
    .map(resp=>resp.json());
   }

   deleteObservation(id:number){
    return this.http.delete("http://localhost:8080/observation/"+id)
    .map(resp=>resp.json());
}
}