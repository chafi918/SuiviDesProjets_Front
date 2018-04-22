import { Component, OnInit } from '@angular/core';
import { Profil } from '../../model/model.profil';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

@Injectable()
export class ProfilComponent implements OnInit {
  profil:Profil = new Profil();
  pageProfils:any;
  pages:Array<number>;
  currentPage:number=0;
  libelleProfil:string;
  mode:number=0;
  display:number=0;

  constructor(public http:Http,public profilService:ProfilService,public router:Router) { }

  ngOnInit() {
    this.profilService.getProfils()
    .subscribe(data=>{
      console.log("on init");
      console.log(data);
      this.pageProfils=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
    }
    ,err=>{console.log(err);})
    console.log(this.mode);
  }

  chercher(){
    this.profilService.chercherProfil(this.libelleProfil)
    .subscribe(data=>{
      this.pageProfils=data;
      this.pages=new Array(data.totalPages);
    },err=>{console.log(err);})
  }

  ajouterProfil(){
    this.profilService.ajouterProfil(this.profil)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
    this.display=0;
  }


  clickOnAjouterProfil(){
    this.mode=0;
    this.display=1;
    this.profil=new Profil();  
  }

  updateProfil(){
    this.profilService.updateProfil(this.profil)
    .subscribe(data=>{this.ngOnInit();},err=>{console.log(err);});
    this.mode=1;
    this.display=0;
    this.profil=new Profil();
  }

  onEditProfil(id:number){
    this.mode=1;
    this.display=1;
    this.profilService.getProfil(id)
    .subscribe(data=>{this.profil=data; console.log(data);}
    ,err=>{console.log(err);})
  }

  onDeleteProfil(profil:Profil){
    this.profilService.deleteProfil(profil.idProfil)
    .subscribe(data=>{
      this.pageProfils.content.splice(
        this.pageProfils.content.indexOf(profil),1
      );
      this.ngOnInit();
    }
    ,err=>{console.log(err);})
  }

  gotoPage(i:number){
    this.profilService.getProfilsParPage(i)
    .subscribe(data=>{
      this.pageProfils=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;}
    ,err=>{console.log(err);})
  }

  isValidForm(){
    return this.profil.libelleProfil && this.profil.libelleProfil.length != 0
  }
}
