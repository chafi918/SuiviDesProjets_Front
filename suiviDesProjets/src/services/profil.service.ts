import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Profil } from "../model/model.profil";



@Injectable()
export class ProfilService{
    constructor(public http:Http){

    }
       
getProfils(){
 return this.http.get("http://localhost:8080/adminProfil/getAllProfils")
 .map(resp=>resp.json());
}

getProfilsParPage(page:number){
 return this.http.get("http://localhost:8080/adminProfil/getAllProfils?page="+page)
 .map(resp=>resp.json());
}

getProfil(id:number){
 return this.http.get("http://localhost:8080/adminProfil/"+id)
 .map(resp=>resp.json());
}

ajouterProfil(profil:Profil){
 return this.http.post("http://localhost:8080/adminProfil/ajout",profil)
 .map(resp=>resp);
}

 updateProfil(profil:Profil){
 return this.http.put("http://localhost:8080/adminProfil/"+profil.idProfil,profil)
 .map(resp=>resp);
}

deleteProfil(id:number){
 return this.http.delete("http://localhost:8080/adminProfil/"+id)
 .map(resp=>resp.json());
}

 chercherProfil(libelleProfil:string){
     return this.http.get("http://localhost:8080/adminProfil/profilBN/?name="+libelleProfil)
     .map(resp=>resp.json());

 }

}