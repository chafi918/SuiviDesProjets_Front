import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Statut } from "../model/model.statut";


@Injectable()
export class StatutService{
    constructor(public http:Http){

    }
       
getStatuts(){
 return this.http.get("http://localhost:8080/admin/getAllStatuts")
 .map(resp=>resp.json());
}

getStatusParPage(page:number){
 return this.http.get("http://localhost:8080/admin/getAllStatuts?page="+page)
 .map(resp=>resp.json());
}

getStatut(id:number){
 return this.http.get("http://localhost:8080/admin/statut/"+id)
 .map(resp=>resp.json());
}

ajouterStatut(statut:Statut){
 return this.http.post("http://localhost:8080/admin/statut",statut)
 .map(resp=>resp);
}

 updateStatut(statut:Statut){
 return this.http.put("http://localhost:8080/admin/statuts/"+statut.idStatut,statut)
 .map(resp=>resp.json());
}

deleteStatut(id:number){
 return this.http.delete("http://localhost:8080/admin/statuts/"+id)
 .map(resp=>resp.json());
}

 chercherStatut(libelleStatut:string){
     return this.http.get("http://localhost:8080/admin/statutBN/?name="+libelleStatut)
     .map(resp=>resp.json());

 }

}