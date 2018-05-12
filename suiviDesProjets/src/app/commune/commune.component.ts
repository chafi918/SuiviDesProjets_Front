import { Component, OnInit } from '@angular/core';
import { Commune } from '../../model/model.commune';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { CommuneService } from '../../services/commune.service';

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.css']
})
export class CommuneComponent implements OnInit {
  commune:Commune=new Commune();
  pageCommunes:any;
  pages:Array<number>;
  currentPage:number=0;
  libelleCommune:string;
  mode:number=0;
  display:number=0;

  constructor(public http:Http,public router:Router,public communeService:CommuneService) { }

  ngOnInit() {
    this.communeService.getCommunes()
    .subscribe(data=>{
      console.log("on init");
      console.log(data.content);
      this.pageCommunes=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
    }
    ,err=>{console.log(err);})
    console.log(this.mode);
  }

  chercher(){
    this.communeService.chercherCommune(this.libelleCommune)
    .subscribe(data=>{
      this.pageCommunes=data;
      this.pages=new Array(data.totalPages);
    },err=>{console.log(err);})
  }

  ajouterCommune(){
    console.log(this.commune);
    this.communeService.ajouterCommune(this.commune)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.display=0;
    this.mode=0;
    
  }

  retourAuComposant(){
    this.mode=0;
    this.display=0;
  }
  
  clickOnAjouterCommune(){
    this.mode=0;
    this.display=1;
    this.commune=new Commune();  
  }

  updateCommune(){
    this.communeService.updateCommune(this.commune)
    .subscribe(data=>{this.ngOnInit();},err=>{console.log(err);});
    this.mode=1;
    this.display=0;
    this.commune=new Commune();
    this.ngOnInit();
  }
  onEditCommune(id:number){
    this.mode=1;
    this.display=1;
    this.communeService.getCommune(id)
    .subscribe(data=>{this.commune=data; console.log(data);}
    ,err=>{console.log(err);})
  }

  onDeleteCommune(commune:Commune){
    this.communeService.deleteCommune(commune.idCommune)
    .subscribe(data=>{
      this.pageCommunes.content.splice(
        this.pageCommunes.content.indexOf(commune),1
      );
      this.ngOnInit();
    }
    ,err=>{console.log(err);})
  }

  gotoPage(i:number){
    this.communeService.getCommunesParPage(i)
    .subscribe(data=>{
      this.pageCommunes=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;}
    ,err=>{console.log(err);})
  }


  isValidForm(){
    return this.commune.libelleCommune && this.commune.libelleCommune.length != 0;
  }

}
