import { Injectable, EventEmitter } from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';
import { Projet } from "../model/model.projet";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { CommonService } from "./common.service";

@Injectable()
export class ProjetService extends CommonService {
    constructor(public http: Http) {
        super();
    }

    getProjets() {
        console.log(this.options);
        return this.http.get(this.backEndUrl +"/projet/getProjets", this.options)
            .map(resp => resp.json());
    }


    getProjet(id: number) {
        console.log("fromService idProjet = " + id);
        return this.http.get(this.backEndUrl +"/projet/" + id, this.options)
            .map(resp => resp.json());
    }

    getProjetsParPage(page: number) {
        return this.http.get(this.backEndUrl +"/projet/getProjets?page=" + page, this.options)
            .map(resp => resp.json());
    }

    ajouterProjet(projet: Projet) {
        return this.http.post(this.backEndUrl +"/projet/ajout", projet, this.options)
            .map(resp => resp);
    }

    getAllStatuts() {
        return this.http.get(this.backEndUrl +"/admin/statuts", this.options)
            .map(resp => resp.json());
    }

    getAllSecteurs() {
        return this.http.get(this.backEndUrl +"/admin/secteurs", this.options)
            .map(resp => resp.json());
    }
    
    getAllCommunes(){
        return this.http.get(this.backEndUrl +"/admin/communes", this.options)
        .map(resp=>resp.json());
    }

    updateProjet(projet: Projet) {
        return this.http.put(this.backEndUrl +"/projet/" + projet.idProjet, projet, this.options)
            .map(resp => resp.json());
    }

    deleteProjet(id: number) {
        return this.http.delete(this.backEndUrl +"/projet/" + id, this.options)
            .map(resp => resp.json());
    }

    chercherProjet(critere: string, motCle: string) {
        return this.http.get(this.backEndUrl +"/projet/recherche?critere=" + critere + "&mc=" + motCle, this.options)
            .map(resp => resp.json());

    }

    exportCSV(){
        return this.http.get(this.backEndUrl +"/projet/exportProjets", this.options)
            .map(resp => resp.json());
    }
}