import { Component, OnInit } from '@angular/core';
import { Http} from '@angular/http';
import { UrlResolver } from '@angular/compiler';
import "rxjs/add/operator/map";
import { ProjetService } from '../../services/projets.service';
import { Projet } from '../../model/model.projet';
import { Secteur } from '../../model/model.secteur';
import { Statut } from '../../model/model.statut';
import { ObservationService } from '../../services/observation.service';
import { Observation } from '../../model/model.observation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
   pageProjets:any;
   motCle:string="";
   pages:Array<number>;
   currentPage:number=0;
   projet:Projet=new Projet();
   libelleSecteur:string;
   libelleStatut:string;
   mode:number=0;
   display:number=0;
   secteurs:Array<Secteur>;
   statuts:Array<Statut>;
   observation:Observation=new Observation();
  constructor(public http:Http,public router:Router,public projetService:ProjetService,public observationService:ObservationService) { }

  ngOnInit() {
   this.projetService.getProjets()
   .subscribe(data=>{
     this.pageProjets=data;
     this.pages=new Array(data.totalPages);
     this.currentPage = data.number;
     this.getAllSecteurs();
     this.getAllStatuts();
    this.libelleStatut = this.libelleSecteur = "";}
    ,err=>{console.log(err);})
  }

  ajouterProjet(){
    this.projet.secteur = this.getSecteurByName(this.secteurs, this.libelleSecteur);
    this.projet.statut = this.getStatutByName(this.statuts, this.libelleStatut);
    console.log(this.projet);
    this.projetService.ajouterProjet(this.projet)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
    this.display=0;
    
  }

  getSecteurByName(secteurs, libelleSecteur){
    for (let index = 0; index < secteurs.length; index++) {
      if (secteurs[index].libelleSecteur === libelleSecteur) {
        return secteurs[index];
      }
    }
  }
  getStatutByName(statuts, libelleStatut){
    for (let index = 0; index < statuts.length; index++) {
      if (statuts[index].libelleStatut === libelleStatut) {
        return statuts[index];
      }
    }
  }
  getAllSecteurs(){
    this.projetService.getAllSecteurs()
    .subscribe(data=>{this.secteurs=data;},
      err=>{console.log(err);})
  }
  getAllStatuts(){
    this.projetService.getAllStatuts()
    .subscribe(data=>{this.statuts=data;},
      err=>{console.log(err);})
  }
  clickOnAjouterProjet(){
    this.mode=0;
    this.display=1;
    this.projet=new Projet();
    this.libelleSecteur = this.libelleStatut = "";
  }
  clickOnAjouterObservation(){
    this.mode=0;
	  this.display=1;
    this.observation=new Observation();
  }
  ajouterObservation(){
    this.observationService.ajouterObservation(this.observation)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
	  this.display=0;
    this.observation=new Observation();

  }

  chercher(){
    
  }

  gotoPage(i:number){
    this.projetService.getProjetsParPage(i)
    .subscribe(data=>{
      this.pageProjets=data;
      this.pages=new Array(data.totalPages);}
    ,err=>{console.log(err);})
  }

  onDetailsProjet(idProjet:number){
    console.log(idProjet);
    this.projetService.idProjetEvent.emit(idProjet);
    this.router.navigate(['/detailsProjet']);
  }
  
  isValidForm(){
    this.projet.secteur = this.getSecteurByName(this.secteurs, this.libelleSecteur);
    this.projet.statut = this.getStatutByName(this.statuts, this.libelleStatut);
    return this.projet.intitule&& this.projet.intitule.length  != 0
            && this.projet.commune && this.projet.commune.length != 0
            && this.projet.chargeDuProjet && this.projet.chargeDuProjet.length != 0
            && this.projet.secteur && this.projet.statut
            && this.projet.dateAO && this.projet.dateCommTravaux
            && this.projet.dateOP && this.projet.montantProgramme && this.projet.montantProgramme !=0  ;
           
  }

}
