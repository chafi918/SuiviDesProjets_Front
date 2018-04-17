import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Type } from "../model/model.type";




@Injectable()
export class TypeDocService{
    constructor(public http:Http){

    }
       
getTypes(){
 return this.http.get("http://localhost:8080/adminType/getAllTypes")
 .map(resp=>resp.json());
}

getTypesParPage(page:number){
 return this.http.get("http://localhost:8080/adminType/getAllTypes?page="+page)
 .map(resp=>resp.json());
}

getType(id:number){
 return this.http.get("http://localhost:8080/adminType/"+id)
 .map(resp=>resp.json());
}

ajouterType(type:Type){
 return this.http.post("http://localhost:8080/adminType/ajout",type)
 .map(resp=>resp);
}

 updateType(type:Type){
 return this.http.put("http://localhost:8080/adminType/"+type.idTypeDoc,type)
 .map(resp=>resp);
}

deleteType(id:number){
 return this.http.delete("http://localhost:8080/adminType/"+id)
 .map(resp=>resp.json());
}

 chercherType(libelleType:string){
     return this.http.get("http://localhost:8080/adminType/typeBN/"+libelleType)
     .map(resp=>resp.json());

 }

}