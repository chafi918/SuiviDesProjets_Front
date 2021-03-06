import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../../model/model.document';
import { HttpClient } from '@angular/common/http';
import { DocumentService } from '../../services/document.service';
import { InputDocument } from '../../model/model.inputDocument';
import { Type } from '../../model/model.type';
import { TypeDocService } from '../../services/typeDoc.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { saveAs as importedSaveAs } from "file-saver";
import 'rxjs/Rx';
import { Buffer } from 'buffer';
import { LoginService } from '../../services/login.service';
import { isNull } from 'util';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  document: Document = new Document();
  documentPage: any;
  idProjet: number;
  file: File;
  types: any;
  mode: number = 0;
  display: number = 0;
  pages: Array<number>;
  currentPage: number = 0;
  input: InputDocument = new InputDocument();
  libelleType: string;

  constructor(public documentService: DocumentService,
    public typeDocService: TypeDocService,
    public route: ActivatedRoute,
    public router: Router,
    public loginService: LoginService) { }

  ngOnInit() {
    this.idProjet = Number(this.route.snapshot.paramMap.get('id'));
    this.getAllTypes();
    this.initComponentFromProjectDetails();
  }

  initComponentFromProjectDetails() {
    this.documentService.getDocumentsParProjet(this.idProjet, this.currentPage)
      .subscribe(
        data => {
          this.documentPage = data;
          this.pages = new Array(data.totalPages);
          this.currentPage = data.number;
        }, err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        }
      )
  }
  gotoPage(i: number) {
    this.documentService.getDocumentsParProjet(this.idProjet, i)
      .subscribe(data => {
        this.documentPage = data;
        this.pages = new Array(data.totalPages);
        this.currentPage = i;
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
  }

  public getAllTypes() {
    this.typeDocService.getTypes()
      .subscribe(data => {
        console.log("on init");
        console.log(data.content);
        this.types = data.content;
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })

  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file.size);
    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.document.nomDocument = this.document.nomDocument == undefined ? this.file.name : this.document.nomDocument;
      this.input.contenu = reader.result.split(',')[1];
    };
  }

  uploadDocument() {
    this.document.dateAjout = new Date();
    this.document.type = this.getTypeByLibelle();
    //----
    this.input.document = this.document;
    this.input.idProjet = this.idProjet;
    this.documentService.uploadDocument(this.input)
      .subscribe(data => {
        console.log("return upload: " + data);
        this.ngOnInit();
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        });

    this.display = 0;
    this.mode = 0;
    this.document = new Document();
  }

  updateDocument() {
    this.document.dateAjout = new Date();
    this.document.type = this.getTypeByLibelle();
    this.documentService.updateDocument(this.document)
      .subscribe(data => { this.ngOnInit(); }, err => {
        this.loginService.logout();
        this.router.navigateByUrl("/login");
      });
    this.mode = 1;
    this.display = 0;
    this.document = new Document();
  }

  onFileDownload(event, documentc) {
    console.log(event);
    //window.open("data:application/octet-stream;base64," + documentc.contenu);
    var link = document.createElement('a');
    link.href = "data:application/octet-stream;base64," + documentc.contenu;
    link.download = documentc.nomDocument;
    link.click();
  }

  onDeleteDocument(document: Document) {
    if(confirm("Est vous sûr de vouloir supprimer le document: "+document.nomDocument)) {
    this.documentService.deleteDocument(document.idDocument)
      .subscribe(data => {
        this.documentPage.content.splice(
          this.documentPage.content.indexOf(document), 1);
        this.ngOnInit();
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
      }
      }

  retourAuComposant() {
    this.mode = 0;
    this.display = 0;
  }

  onEditDocument(id: number) {
    this.mode = 1;
    this.display = 1;
    this.document = this.getDocument(id);
    this.libelleType = this.document.type.libelleType;
  }

  getDocument(id) {
    console.log(this.documentPage.content.length)
    console.log(this.documentPage)
    for (let index = 0; index < this.documentPage.content.length; index++) {
      if (this.documentPage.content[index].idDocument == id) {
        console.log(this.documentPage.content[index]);
        return this.documentPage.content[index];
      }
    }
  }

  getTypeByLibelle() {
    for (let index = 0; index < this.types.length; index++) {
      if (this.types[index].libelleType === this.libelleType) {
        return this.types[index];
      }
    }
  }
  isValidForm() {
    let first:boolean = this.document.chargeurDocument && this.document.chargeurDocument.length != 0
      && this.document.objetDocument && this.document.objetDocument.length != 0
      && !isNull(this.libelleType)
      if (this.mode == 0) {
        first = first && !isNull(this.file);
      }
    return first;
  }

  clickOnAjouterDocument() {
    this.mode = 0;
    this.display = 1;
    this.document = new Document();
  }
}
