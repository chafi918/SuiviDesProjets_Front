import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { CommonService } from "./common.service";

@Injectable()
export class StatistiquesService extends CommonService{
    constructor(public http:Http){
        super();
    }

    getStatistiques(critere) {
        return this.http.get("http://localhost:8080/projet/statistiques?critere=" + critere, this.options)
        .map(resp=>resp.json());

    }
}