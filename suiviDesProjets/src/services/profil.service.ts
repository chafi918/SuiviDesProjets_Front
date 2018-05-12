import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Profil } from "../model/model.profil";
import { CommonService } from "./common.service";



@Injectable()
export class ProfilService extends CommonService{
    constructor(public http:Http){
        super();
    }
       
getProfils(){
 return this.http.get("http://localhost:8080/adminProfil/getAllProfils", this.options)
 .map(resp=>resp.json());
}

getProfilsParPage(page:number){
 return this.http.get("http://localhost:8080/adminProfil/getAllProfils?page="+page, this.options)
 .map(resp=>resp.json());
}

getProfil(id:number){
 return this.http.get("http://localhost:8080/adminProfil/"+id, this.options)
 .map(resp=>resp.json());
}

ajouterProfil(profil:Profil){
 return this.http.post("http://localhost:8080/adminProfil/ajout",profil, this.options)
 .map(resp=>resp);
}

 updateProfil(profil:Profil){
 return this.http.put("http://localhost:8080/adminProfil/"+profil.idProfil,profil, this.options)
 .map(resp=>resp);
}

deleteProfil(id:number){
 return this.http.delete("http://localhost:8080/adminProfil/"+id, this.options)
 .map(resp=>resp.json());
}

 chercherProfil(libelleProfil:string){
     return this.http.get("http://localhost:8080/adminProfil/profilBN/?name="+libelleProfil, this.options)
     .map(resp=>resp.json());

 }

}