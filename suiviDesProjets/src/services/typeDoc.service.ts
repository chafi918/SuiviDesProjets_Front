import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Type } from "../model/model.type";
import { CommonService } from "./common.service";




@Injectable()
export class TypeDocService extends CommonService{
    constructor(public http:Http){
        super();
    }
       
getTypes(){
 return this.http.get("http://localhost:8080/adminType/getAllTypes", this.options)
 .map(resp=>resp.json());
}

getTypesParPage(page:number){
 return this.http.get("http://localhost:8080/adminType/getAllTypes?page="+page, this.options)
 .map(resp=>resp.json());
}

getType(id:number){
 return this.http.get("http://localhost:8080/adminType/"+id, this.options)
 .map(resp=>resp.json());
}

ajouterType(type:Type){
 return this.http.post("http://localhost:8080/adminType/ajout",type, this.options)
 .map(resp=>resp);
}

 updateType(type:Type){
 return this.http.put("http://localhost:8080/adminType/"+type.idTypeDoc,type, this.options)
 .map(resp=>resp);
}

deleteType(id:number){
 return this.http.delete("http://localhost:8080/adminType/"+id, this.options)
 .map(resp=>resp.json());
}

 chercherType(libelleType:string){
     return this.http.get("http://localhost:8080/adminType/typeBN/?name="+libelleType, this.options)
     .map(resp=>resp.json());

 }

}