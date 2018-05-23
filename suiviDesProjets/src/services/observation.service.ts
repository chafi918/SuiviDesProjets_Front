import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observation } from "../model/model.observation";
import { InputObservation } from "../model/model.inputObservation";
import { CommonService } from "./common.service";
 


@Injectable()
export class ObservationService extends CommonService{
   constructor(public http:Http){
       super();
   }

   getObservations(){
    return this.http.get(this.backEndUrl +"/observation/getObservations", this.options)
    .map(resp=>resp.json());
   }

   getObservationsByProjet(idProjet:number, page:number){
    return this.http.get(this.backEndUrl +"/observation/projet?idProjet="+idProjet+"&page="+page, this.options)
    .map(resp=>resp.json());
   }

   getObservationsParPage(page:number){
    return this.http.get(this.backEndUrl +"/observation/getObservations?page="+page, this.options)
    .map(resp=>resp.json());
   }

   getObservation(id:number){
    return this.http.get(this.backEndUrl +"/observation/"+id, this.options)
    .map(resp=>resp.json());
   }

   ajouterObservation(observation:InputObservation){
       console.log(observation);
    return this.http.post(this.backEndUrl +"/observation/ajout",observation, this.options)
    .map(resp=>resp);
   }

    updateObservation(observation:Observation){
    return this.http.put(this.backEndUrl +"/observation/"+observation.idObservation,observation, this.options)
    .map(resp=>resp.json());
   }

   deleteObservation(id:number){
    return this.http.delete(this.backEndUrl +"/observation/"+id, this.options)
    .map(resp=>resp.json());
}
}