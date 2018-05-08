import { Component, OnInit } from '@angular/core';
import { Projet } from '../../model/model.projet';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ProjetService } from '../../services/projets.service';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../model/model.document';
import {Buffer} from 'buffer';
@Component({
  selector: 'app-referentiel-document',
  templateUrl: './referentiel-document.component.html',
  styleUrls: ['./referentiel-document.component.css']
})
export class ReferentielDocumentComponent implements OnInit {
  panelOpenState: boolean = false;
  documentMap:Map<string, Map<string,Array<Document>>> = new Map<string, Map<string,Array<Document>>>();
  projects:Array<String>;
  types:Array<String>;
  checkSize:number;
  constructor(public http:Http,public router:Router,public documentService:DocumentService) { }

  ngOnInit() {
    this.documentService.getDocumentsMap()
    .subscribe(data=>{
      let str = 'test porjet';
      console.log(data);
      this.projects = data.projetsName;
      this.types = data.typesName;
      this.documentMap = data.documentMap;
    }, err => {console.log(err);})
  }

  documentDeProjetEtType(projet, type){
    let documents = this.documentMap[projet][type];
    return documents;
  }

  onFileDownload(event, document) {
    console.log(event);
    //console.log(document.contenu);
    var buffer = new Buffer( document.contenu );
    var bufferBase64 = buffer.toString('base64');
    //console.log("bufferBase64: " + bufferBase64)
    var url = "data:application/octet-stream;charset=utf-8;base64,bW9uIGNvZXVyIGVzdCBlbiBwYXlzIGRlcyBtZXJ2ZWlsbGVzIC4uLg=="
    //"data:image/png;base64,"+document.contenu;
    window.open(url);
    //importedSaveAs(blob, document.nomDocument);
  }
}
