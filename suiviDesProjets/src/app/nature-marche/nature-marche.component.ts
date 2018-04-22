import { Component, OnInit } from '@angular/core';
import { Nature } from '../../model/model.nature';
import { NatureService } from '../../services/nature.service';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
@Component({
  selector: 'app-nature-marche',
  templateUrl: './nature-marche.component.html',
  styleUrls: ['./nature-marche.component.css']
})
export class NatureMarcheComponent implements OnInit {
  nature:Nature=new Nature();
  pageNatures:any;
  pages:Array<number>;
  currentPage:number=0;
  libelleNature:string;
  mode:number=0;
  display:number=0;

  constructor(public http:Http,public natureService:NatureService,public router:Router) { }

  ngOnInit() {
    this.natureService.getNatures()
    .subscribe(data=>{
      this.pageNatures=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
    }
    ,err=>{console.log(err);})
    console.log(this.mode);
  }

  chercher(){
    this.natureService.chercherNature(this.libelleNature)
    .subscribe(data=>{
      this.pageNatures=data;
      this.pages=new Array(data.totalPages);
    },err=>{console.log(err);})
  }

  ajouterNature(){
    this.natureService.ajouterNature(this.nature)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
    this.display=0;
  }


  clickOnAjouterNature(){
    this.mode=0;
    this.display=1;
    this.nature=new Nature();
  }

  updateNature(){
    this.natureService.updateNature(this.nature)
    .subscribe(data=>{this.ngOnInit();},err=>{console.log(err);});
    this.mode=1;
    this.display=0;
    this.nature=new Nature();
  }
  onEditNature(id:number){
    this.mode=1;
    this.display=1;
    this.natureService.getNature(id)
    .subscribe(data=>{this.nature=data; console.log(data);}
    ,err=>{console.log(err);})
  }

  onDeleteNature(nature:Nature){
    this.natureService.deleteNature(nature.idNature)
    .subscribe(data=>{
      this.pageNatures.content.splice(
        this.pageNatures.content.indexOf(nature),1
      );
      this.ngOnInit();
    }
    ,err=>{console.log(err);})
  }

  gotoPage(i:number){
    this.natureService.getNaturesParPage(i)
    .subscribe(data=>{
      this.pageNatures=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;}
    ,err=>{console.log(err);})
  }

  isValidForm(){
    return this.nature.libelleNature && this.nature.libelleNature.length != 0
  }

}
