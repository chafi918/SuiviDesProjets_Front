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
        return this.http.get("http://localhost:8080/projet/getProjets", this.options)
            .map(resp => resp.json());
    }


    getProjet(id: number) {
        console.log("fromService idProjet = " + id);
        return this.http.get("http://localhost:8080/projet/" + id, this.options)
            .map(resp => resp.json());
    }

    getProjetsParPage(page: number) {
        return this.http.get("http://localhost:8080/projet/getProjets?page=" + page, this.options)
            .map(resp => resp.json());
    }

    ajouterProjet(projet: Projet) {
        return this.http.post("http://localhost:8080/projet/ajout", projet, this.options)
            .map(resp => resp);
    }

    getAllStatuts() {
        return this.http.get("http://localhost:8080/admin/statuts", this.options)
            .map(resp => resp.json());
    }

    getAllSecteurs() {
        return this.http.get("http://localhost:8080/admin/secteurs", this.options)
            .map(resp => resp.json());
    }

    updateProjet(projet: Projet) {
        return this.http.put("http://localhost:8080/projet/" + projet.idProjet, projet, this.options)
            .map(resp => resp.json());
    }

    deleteProjet(id: number) {
        return this.http.delete("http://localhost:8080/projet/" + id, this.options)
            .map(resp => resp.json());
    }

    chercherProjet(critere: string, motCle: string) {
        return this.http.get("http://localhost:8080/projet/recherche?critere=" + critere + "&mc=" + motCle, this.options)
            .map(resp => resp.json());

    }
}