import { Component, OnInit } from '@angular/core';
import { Type } from '../../model/model.type';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { TypeDocService } from '../../services/typeDoc.service';

@Injectable()
@Component({
  selector: 'app-type-document',
  templateUrl: './type-document.component.html',
  styleUrls: ['./type-document.component.css']
})
export class TypeDocumentComponent implements OnInit {
  type:Type= new Type();
  pageTypes:any;
  pages:Array<number>;
  currentPage:number=0;
  libelleType:string;
  mode:number=0;
  display:number=0;
  
  constructor(public http:Http,public typeDocService:TypeDocService,public router:Router) { }

  ngOnInit() {
    this.typeDocService.getTypes()
    .subscribe(data=>{
      console.log("on init");
      console.log(data);
      this.pageTypes=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
    }
    ,err=>{console.log(err);})
    console.log(this.mode);
  }
  
  chercher(){
    this.typeDocService.chercherType(this.libelleType)
    .subscribe(data=>{
      this.pageTypes=data;
      this.pages=new Array(data.totalPages);
    },err=>{console.log(err);})
  }

  ajouterType(){
    this.typeDocService.ajouterType(this.type)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
    this.display=0;
  }
  retourAuComposant(){
    this.mode=0;
    this.display=0;
  }

  clickOnAjouterType(){
    this.mode=0;
    this.display=1;
    this.type=new Type();
  }

  updateType(){
    this.typeDocService.updateType(this.type)
    .subscribe(data=>{this.ngOnInit();},err=>{console.log(err);});
    this.mode=1;
    this.display=0;
    this.type=new Type();
  }
  onEditType(id:number){
    this.mode=1;
    this.display=1;
    this.typeDocService.getType(id)
    .subscribe(data=>{this.type=data; console.log(data);}
    ,err=>{console.log(err);})
  }

  onDeleteType(type:Type){
    if(confirm("Est vous sûr de vouloir supprimer le type: "+type.libelleType)) {
    this.typeDocService.deleteType(type.idTypeDoc)
    .subscribe(data=>{
      this.pageTypes.content.splice(
        this.pageTypes.content.indexOf(type),1
      );
      this.ngOnInit();
    }
    ,err=>{console.log(err);})
  }
  }

  gotoPage(i:number){
    this.typeDocService.getTypesParPage(i)
    .subscribe(data=>{
      this.pageTypes=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = i;}
    ,err=>{console.log(err);})
  }

  isValidForm(){
    return this.type.libelleType && this.type.libelleType.length != 0;
  }

}
