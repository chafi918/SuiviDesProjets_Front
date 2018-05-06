import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Document } from "../model/model.document";
import { InputDocument } from "../model/model.inputDocument";


@Injectable()
export class DocumentService{

    constructor(public http:Http){

    }

    deleteDocument(id:number){
        return this.http.delete("http://localhost:8080/document/"+id)
    .map(resp=>resp.json());
    }
    getDocumentsParProjet(idProjet:number, page:number){
        return this.http.get("http://localhost:8080/document/projet?idProjet="+idProjet+"&page="+page)
        .map(resp=>resp.json());
    }
    getDocumentOfProject(idProjet:any, page:number){
        return this.http.
        get("http://localhost:8080/document/projet/?idProjet="+idProjet+"&page="+page)
        .map(resp=>resp.json());
    }
    uploadDocument(document:InputDocument){
        console.log(document);
        return this.http.post("http://localhost:8080/document/ajout",document)
        .map(resp=>resp.json());
    }

    updateDocument(document:Document){
        console.log(document);
        return this.http.put("http://localhost:8080/document/"+document.idDocument, document)
        .map(resp=>resp.json());
    }
}