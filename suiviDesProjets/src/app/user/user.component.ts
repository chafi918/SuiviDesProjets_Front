import { Component, OnInit } from '@angular/core';
import { Http} from '@angular/http';
import { UserService } from '../../services/user.service';
import { Division } from '../../model/model.division';
import { Utilisateur } from '../../model/model.user';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Profil } from '../../model/model.profil';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

@Injectable()
export class UserComponent implements OnInit {
pageUsers:any;
idDivision:number;
idProfil:number;
divisions:Array<Division>;
profils:Array<Profil>;
pages:Array<number>;
currentPage:number=0;
mode:number=0;
utilisateur:Utilisateur=new Utilisateur();
  constructor(public http:Http , public userService:UserService,public router:Router) {
   
   }

   ngOnInit() {
    this.userService.getUsers()
    .subscribe(data=>{
      console.log('data = ', data);
      this.pageUsers=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
      this.getAllDivisions();
      this.getAllProfils();}
    ,err=>{console.log(err);})
  }
  initializeComponent(mode=0){
    this.mode=0;
    this.userService.getUsers()
    .subscribe(data=>{
      console.log("on init");
      console.log(data);
      this.pageUsers=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
    }
    ,err=>{console.log(err);})
    console.log(mode);
  }

  ajouterUser(){
    this.utilisateur.division = this.getDivisionById(this.divisions, this.idDivision);
    this.utilisateur.profil = this.getProfilById(this.profils, this.idProfil);
    console.log(this.utilisateur);
    this.userService.ajouterUser(this.utilisateur)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
    
  }

  getProfilById(profils, idProfil){
    for (let index = 0; index < profils.length; index++) {
      if (profils[index].idProfil == idProfil) {
        return profils[index];
      }
    }
  }

  getDivisionById(divisions, idDivision){
    for (let index = 0; index < divisions.length; index++) {
      if (divisions[index].idDivision == idDivision) {
        return divisions[index];
      }
    }
  }
  clickOnAjouterUser(){
    this.mode=0;
    this.utilisateur=new Utilisateur();
  }

  getAllDivisions(){
    this.userService.getAllDivisions()
    .subscribe(data=>{this.divisions=data;},
      err=>{console.log(err);})
  }

  getAllProfils(){
    this.userService.getAllProfils()
    .subscribe(data=>{this.profils=data;},
      err=>{console.log(err);})
  }
}
