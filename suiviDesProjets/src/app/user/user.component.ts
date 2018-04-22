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
libelleDivision:string;
libelleProfil:string;
divisions:Array<Division>;
profils:Array<Profil>;
pages:Array<number>;
currentPage:number=0;
mode:number=0;
display:number=0;
motCle:string;
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
      this.getAllProfils();
     // this.utilisateur = new Utilisateur();
     this.libelleDivision = this.libelleProfil = "";
    
  }
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
    this.utilisateur.division = this.getDivisionByName(this.divisions, this.libelleDivision);
    this.utilisateur.profil = this.getProfilByName(this.profils, this.libelleProfil);
    console.log(this.utilisateur);
    this.userService.ajouterUser(this.utilisateur)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
    this.display=0;
    
  }

  getProfilByName(profils, libelleProfil){
    for (let index = 0; index < profils.length; index++) {
      if (profils[index].libelleProfil === libelleProfil) {
        return profils[index];
      }
    }
  }

  getDivisionByName(divisions, libelleDivision){
    for (let index = 0; index < divisions.length; index++) {
      if (divisions[index].libelleDivision === libelleDivision) {
        return divisions[index];
      }
    }
  }


  clickOnAjouterUser(){
    this.mode=0;
    this.display=1;
    this.utilisateur=new Utilisateur();
    this.libelleDivision = this.libelleProfil = "";
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

  updateUser(){
    console.log(this.utilisateur);
    this.userService.updateUser(this.utilisateur)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=1;
    this.display=0;
    this.utilisateur=new Utilisateur();    
    
  }
  onEditUser(id:number){
    this.mode=1;
    this.display=1;
    this.userService.getUser(id)
    .subscribe(data=>{this.utilisateur=data;
      this.libelleDivision = this.utilisateur.division.libelleDivision;
      this.libelleProfil = this.utilisateur.profil.libelleProfil;
       console.log(data);}
    ,err=>{console.log(err);})
  }

  chercher(){
    this.userService.chercherUserParMotCle(this.motCle)
    .subscribe(data=>{
      this.pageUsers=data;
      this.pages=new Array(data.totalPages);
    },err=>{console.log(err);})
  }

  onDeleteUser(utilisateur:Utilisateur){
    this.userService.deleteUser(utilisateur.idUser)
    .subscribe(data=>{
      this.pageUsers.content.splice(
        this.pageUsers.content.indexOf(utilisateur),1
      );
      this.ngOnInit();
    }
    ,err=>{console.log(err);})
  }

  isValidForm(){
    this.utilisateur.division = this.getDivisionByName(this.divisions, this.libelleDivision);
    this.utilisateur.profil = this.getProfilByName(this.profils, this.libelleProfil);
    return this.utilisateur.nomUser && this.utilisateur.nomUser.length  != 0
            && this.utilisateur.prenomUser && this.utilisateur.prenomUser.length != 0
            && this.utilisateur.loginUser && this.utilisateur.loginUser.length != 0
            && this.utilisateur.division && this.utilisateur.profil
            && this.utilisateur.responsabilite && this.utilisateur.responsabilite.length != 0
            && this.utilisateur.mdpUser && this.utilisateur.mdpUser.length > 8
            && this.utilisateur.mailUser && this.utilisateur.mailUser.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
  }
}
