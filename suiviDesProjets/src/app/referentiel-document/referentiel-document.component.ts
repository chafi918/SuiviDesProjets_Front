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
  years:Array<number>;
  checkSize:number;
  annee:number=0;
  pages: Array<number>;
  currentPage: number = 0;
  constructor(public http:Http,public router:Router,public documentService:DocumentService) { }

  ngOnInit() {
    console.log(this.annee);
    console.log("onInit: " + this.currentPage);
    this.documentService.getDocumentsMap(this.annee,this.currentPage)
    .subscribe(data=>{
      console.log(data);
      this.projects = data.projetsName;
      this.types = data.typesName;
      this.documentMap = data.documentMap;
      this.years = data.years;
      this.pages =  new Array(data.totalPages);
      this.currentPage = data.currentPage;
      console.log("data: " + this.currentPage);
    }, err => {console.log(err);})
  }

  documentDeProjetEtType(projet, type){
    let documents = this.documentMap[projet][type];
    return documents;
  }

  onFileDownload(event, documentc) {
    var link = document.createElement('a');
    link.href = "data:application/octet-stream;base64," + documentc.contenu;
    link.download = documentc.nomDocument;
    link.click();
  }

  goToYear(){
    this.currentPage = 0;
    this.ngOnInit();
  }
  gotoPage(i){
    console.log(i);
    this.currentPage = i;
    this.ngOnInit()
  }
}
