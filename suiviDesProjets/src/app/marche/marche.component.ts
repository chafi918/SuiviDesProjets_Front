import { Component, OnInit } from '@angular/core';
import { Marche } from '../../model/model.marche';
import { MarcheService } from '../../services/marche.service';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Nature } from '../../model/model.nature';
import { Entreprise } from '../../model/model.entreprise';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.css']
})
export class MarcheComponent implements OnInit {
  marche:Marche=new Marche();
  pageMarches:any;
  pages:Array<number>;
  currentPage:number=0;
  numeroMarche:string;
  mode:number=0;
  natures:Array<Nature>;
  libelleNature:string;
  display:number=0;
  nomEntreprise:string;
  entreprises:Array<Entreprise>;
  constructor(public http:Http,public marcheService:MarcheService,public router:Router) { }

  ngOnInit() {
    this.marcheService.getMarches()
    .subscribe(data=>{
      console.log("on init");
      console.log(data);
      this.pageMarches=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
      this.getAllNatures();
      this.getAllEntreprises();
    }
    ,err=>{console.log(err);})
    console.log(this.mode);
  }
  getAllNatures(){
    this.marcheService.getNatures()
    .subscribe(data=>{this.natures=data;},
      err=>{console.log(err);})
  }
  getAllEntreprises(){
    this.marcheService.getEntreprises()
    .subscribe(data=>{this.entreprises=data;},
      err=>{console.log(err);})
  }

  getNatureByName(natures, idNature){
    for (let index = 0; index < natures.length; index++) {
      if (natures[index].libelleNature === idNature) {
        return natures[index];
      }
    }
  }

  getEntrepriseByName(entreprises, nomEntreprise){
    for (let index = 0; index < entreprises.length; index++) {
      if (entreprises[index].nomEntreprise === nomEntreprise) {
        return entreprises[index];
      }
    }
  }

  chercher(){
    this.marcheService.chercherMarche(this.numeroMarche)
    .subscribe(data=>{
      this.pageMarches=data;
      this.pages=new Array(data.totalPages);
    },err=>{console.log(err);})
  }

  ajouterMarche(){
    this.marche.nature = this.getNatureByName(this.natures, this.libelleNature);
    this.marche.entreprise = this.getEntrepriseByName(this.entreprises, this.nomEntreprise);
    this.marcheService.ajouterMarche(this.marche)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
    this.display=0;
    this.marche=new Marche();
    
  }


  clickOnAjouterMarche(){
    this.mode=0;
	  this.display=1;
    this.marche=new Marche();
    this.libelleNature=this.nomEntreprise="";
  }

  updateMarche(){
    this.marcheService.updateMarche(this.marche)
    .subscribe(data=>{this.ngOnInit();},err=>{console.log(err);});
    this.mode=1;
	  this.display=0;
    this.marche=new Marche();
    //this.ngOnInit();
  }
  onEditMarche(id:number){
    this.mode=1;
	this.display=1;
    this.marcheService.getMarche(id)
    .subscribe(data=>{this.marche=data; 
      this.libelleNature = this.marche.nature.libelleNature;
      this.nomEntreprise = this.marche.entreprise.nomEntreprise;console.log(data);}
    ,err=>{console.log(err);})
  }

  onDeleteMarche(marche:Marche){
    this.marcheService.deleteMarche(marche.idMarche)
    .subscribe(data=>{
      this.pageMarches.content.splice(
        this.pageMarches.content.indexOf(marche),1
      );
    }
    ,err=>{console.log(err);})
  }

  gotoPage(i:number){
    this.marcheService.getMarchesParPage(i)
    .subscribe(data=>{
      this.pageMarches=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;}
    ,err=>{console.log(err);})
  }
  
    isValidForm(){
    this.marche.nature = this.getNatureByName(this.natures, this.libelleNature);
    this.marche.entreprise = this.getEntrepriseByName(this.entreprises, this.nomEntreprise);
    return this.marche.numeroMarche && this.marche.numeroMarche.length  != 0
            && this.marche.montantMarche && this.marche.montantMarche != 0
            && this.marche.montantTravauxRealises && this.marche.montantTravauxRealises != 0
            && this.marche.delaiExecution && this.marche.delaiExecution.length !=0
            && this.marche.tauxAvancement && this.marche.tauxAvancement != 0
            && this.marche.nature
            && this.marche.entreprise;
  }


}
