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
        return this.http.get("http://localhost:8080/document/documentsMapByYear?year="+annee+"&page="+page, this.options)
        .map(res=>res.json());
    }
    deleteDocument(id:number){
        return this.http.delete("http://localhost:8080/document/"+id, this.options)
    .map(resp=>resp.json());
    }
    getDocumentsParProjet(idProjet:number, page:number){
        return this.http.get("http://localhost:8080/document/projet?idProjet="+idProjet+"&page="+page, this.options)
        .map(resp=>resp.json());
    }
    getDocumentOfProject(idProjet:any, page:number){
        return this.http.
        get("http://localhost:8080/document/projet/?idProjet="+idProjet+"&page="+page, this.options)
        .map(resp=>resp.json());
    }
    uploadDocument(document:InputDocument){
        console.log(document);
        return this.http.post("http://localhost:8080/document/ajout",document, this.options)
        .map(resp=>resp);
    }

    updateDocument(document:Document){
        console.log(document);
        return this.http.put("http://localhost:8080/document/"+document.idDocument, document, this.options)
        .map(resp=>resp.json());
    }
}