import { Component, OnInit } from '@angular/core';
import { Secteur } from '../../model/model.secteur';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { SecteurService } from '../../services/secteur.service';
import { Injectable } from "@angular/core";

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrls: ['./secteur.component.css']
})
@Injectable()
export class SecteurComponent implements OnInit {
  secteur:Secteur=new Secteur();
  pageSecteurs:any;
  pages:Array<number>;
  currentPage:number=0;
  libelleSecteur:string;
  mode:number=0;
  display:number=0;

  constructor(public http:Http,public secteurService:SecteurService,public router:Router) { }

  ngOnInit() {
    this.secteurService.getSecteurs()
    .subscribe(data=>{
      console.log("on init");
      console.log(data);
      this.pageSecteurs=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
    }
    ,err=>{console.log(err);})
    console.log(this.mode);
  }
  initializeComponent(mode=0){
    this.mode=0;
    this.secteurService.getSecteurs()
    .subscribe(data=>{
      console.log("on init");
      console.log(data);
      this.pageSecteurs=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
    }
    ,err=>{console.log(err);})
    console.log(mode);
  }

  chercher(){
    this.secteurService.chercherSecteur(this.libelleSecteur)
    .subscribe(data=>{
      this.pageSecteurs=data;
      this.pages=new Array(data.totalPages);
    },err=>{console.log(err);})
  }

  ajouterSecteur(){
    console.log(this.secteur);
    this.secteurService.ajouterSecteur(this.secteur)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
    this.display=0;
  }


  clickOnAjouterSecteur(){
    this.mode=0;
    this.display=1;
    this.secteur=new Secteur();  
  }

  updateSecteur(){
    this.secteurService.updateSecteur(this.secteur)
    .subscribe(data=>{this.ngOnInit();},err=>{console.log(err);});
    this.mode=1;
    this.display=0;
    this.secteur=new Secteur();
  }

  onEditSecteur(id:number){
    this.mode=1;
    this.display=1;
    this.secteurService.getSecteur(id)
    .subscribe(data=>{this.secteur=data; console.log(data);}
    ,err=>{console.log(err);})
  }

  onDeleteSecteur(secteur:Secteur){
    this.secteurService.deleteSecteur(secteur.idSecteur)
    .subscribe(data=>{
      this.pageSecteurs.content.splice(
        this.pageSecteurs.content.indexOf(secteur),1
      );
      this.ngOnInit();
    }
    ,err=>{console.log(err);})
  }

  gotoPage(i:number){
    this.secteurService.getSecteursParPage(i)
    .subscribe(data=>{
      this.pageSecteurs=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;}
    ,err=>{console.log(err);})
  }

}
