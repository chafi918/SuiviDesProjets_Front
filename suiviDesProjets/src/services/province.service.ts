import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Commune } from "../model/model.commune";
import { CommonService } from "./common.service";
import { Province } from "../model/model.province";

@Injectable()
export class ProvinceService extends CommonService{
   constructor(public http:Http){
    super();
   }
   getProvinces(){
    return this.http.get(this.backEndUrl + "/admin/getAllProvinces", this.options)
    .map(resp=>resp.json());
   }

   getProvincesParPage(page:number){
    return this.http.get(this.backEndUrl + "/admin/getAllProvinces?page="+page, this.options)
    .map(resp=>resp.json());
   }

   getProvince(id:number){
    return this.http.get(this.backEndUrl +"/admin/province/"+id, this.options)
    .map(resp=>resp.json());
   }

   ajouterProvince(province:Province){
    return this.http.post(this.backEndUrl +"/admin/province",province, this.options)
    .map(resp=>resp);
   }

    updateProvince(province:Province){
    return this.http.put(this.backEndUrl +"/admin/updateProvince/"+province.idProvince,province, this.options)
    .map(resp=>resp.json());
   }

   deleteProvince(id:number){
    return this.http.delete(this.backEndUrl +"/admin/deleteProvince/"+id, this.options)
    .map(resp=>resp.json());
}

    chercherProvince(libelleProvince:string){
        return this.http.get(this.backEndUrl +"/admin/provinceBN?name="+libelleProvince, this.options)
        .map(resp=>resp.json());

    }
}