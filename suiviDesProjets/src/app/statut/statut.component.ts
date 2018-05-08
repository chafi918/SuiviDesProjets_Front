import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { Statut } from '../../model/model.statut';
import { StatutService } from '../../services/statut.service';
import {Http} from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.css']
})
@Injectable()
export class StatutComponent implements OnInit {
  statut:Statut = new Statut();
  pageStatuts:any;
  pages:Array<number>;
  currentPage:number=0;
  libelleStatut:string;
  mode:number=0;
  display:number=0;

  constructor(public http:Http,public statutService:StatutService,public router:Router) { }

  ngOnInit() {
    this.statutService.getStatuts()
    .subscribe(data=>{
      console.log("on init");
      console.log(data);  
      this.statut.libelleStatut="";
      this.pageStatuts=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
    }
    ,err=>{console.log(err);})
    console.log(this.mode);
  }

  initializeComponent(mode=0){
    this.mode=0;
    this.statutService.getStatuts()
    .subscribe(data=>{
      console.log("on init");
      console.log(data);
      this.pageStatuts=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
    }
    ,err=>{console.log(err);})
    console.log(mode);
  }

  chercher(){
    this.statutService.chercherStatut(this.libelleStatut)
    .subscribe(data=>{
      this.pageStatuts=data;
      this.pages=new Array(data.totalPages);
    },err=>{console.log(err);})
  }

  ajouterStatut(){
    this.statutService.ajouterStatut(this.statut)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
    this.display=0;
  }


  clickOnAjouterStatut(){
    this.mode=0;
    this.display=1;
    this.statut=new Statut();  
    this.statut.libelleStatut="";
  }

  updateStatut(){
    this.statutService.updateStatut(this.statut)
    .subscribe(data=>{this.ngOnInit();},err=>{console.log(err);});
    this.mode=0;
    this.display=0;
    this.statut=new Statut();
  }
  onEditStatut(id:number){
    this.mode=1;
    this.display=1;
    this.statutService.getStatut(id)
    .subscribe(data=>{this.statut=data; console.log(data);}
    ,err=>{console.log(err);})
  }

  onDeleteStatut(statut:Statut){
    this.statutService.deleteStatut(statut.idStatut)
    .subscribe(data=>{
      this.pageStatuts.content.splice(
        this.pageStatuts.content.indexOf(statut),1
      );
      this.ngOnInit();
    }
    ,err=>{console.log(err);})
  }

  gotoPage(i:number){
    this.statutService.getStatusParPage(i)
    .subscribe(data=>{
      this.pageStatuts=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;}
    ,err=>{console.log(err);})
  }
  retourAuComposant(){
    this.mode=0;
    this.display=0;
  }
  
  isValidForm(){
    return this.statut.libelleStatut && this.statut.libelleStatut.length != 0;
  }
}
