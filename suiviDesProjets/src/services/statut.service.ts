import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Statut } from "../model/model.statut";
import { CommonService } from "./common.service";


@Injectable()
export class StatutService extends CommonService{
    constructor(public http:Http){
        super();
    }
       
getStatuts(){
 return this.http.get("http://localhost:8080/admin/getAllStatuts", this.options)
 .map(resp=>resp.json());
}

getStatusParPage(page:number){
 return this.http.get("http://localhost:8080/admin/getAllStatuts?page="+page, this.options)
 .map(resp=>resp.json());
}

getStatut(id:number){
 return this.http.get("http://localhost:8080/admin/statut/"+id, this.options)
 .map(resp=>resp.json());
}

ajouterStatut(statut:Statut){
 return this.http.post("http://localhost:8080/admin/statut",statut, this.options)
 .map(resp=>resp);
}

 updateStatut(statut:Statut){
 return this.http.put("http://localhost:8080/admin/statuts/"+statut.idStatut,statut, this.options)
 .map(resp=>resp.json());
}

deleteStatut(id:number){
 return this.http.delete("http://localhost:8080/admin/statuts/"+id, this.options)
 .map(resp=>resp.json());
}

 chercherStatut(libelleStatut:string){
     return this.http.get("http://localhost:8080/admin/statutBN/?name="+libelleStatut, this.options)
     .map(resp=>resp.json());

 }

}