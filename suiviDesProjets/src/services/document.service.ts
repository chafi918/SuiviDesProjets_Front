import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Document } from "../model/model.document";
import { InputDocument } from "../model/model.inputDocument";
import { CommonService } from "./common.service";


@Injectable()
export class DocumentService extends CommonService{

    constructor(public http:Http){
        super();
    }
    getDocumentsMap(annee, page){
        return this.http.get(this.backEndUrl +"/document/documentsMapByYear?year="+annee+"&page="+page, this.options)
        .map(res=>res.json());
    }
    deleteDocument(id:number){
        return this.http.delete(this.backEndUrl +"/document/"+id, this.options)
    .map(resp=>resp.json());
    }
    getDocumentsParProjet(idProjet:number, page:number){
        return this.http.get(this.backEndUrl +"/document/projet?idProjet="+idProjet+"&page="+page, this.options)
        .map(resp=>resp.json());
    }
    getDocumentOfProject(idProjet:any, page:number){
        return this.http.
        get(this.backEndUrl +"/document/projet/?idProjet="+idProjet+"&page="+page, this.options)
        .map(resp=>resp.json());
    }
    uploadDocument(document:InputDocument){
        console.log(document);
        return this.http.post(this.backEndUrl +"/document/ajout",document, this.options)
        .map(resp=>resp);
    }

    updateDocument(document:Document){
        console.log(document);
        return this.http.put(this.backEndUrl +"/document/"+document.idDocument, document, this.options)
        .map(resp=>resp.json());
    }
}