import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UrlResolver } from '@angular/compiler';
import "rxjs/add/operator/map";
import { ProjetService } from '../../services/projets.service';
import { Projet } from '../../model/model.projet';
import { Secteur } from '../../model/model.secteur';
import { Statut } from '../../model/model.statut';
import { ObservationService } from '../../services/observation.service';
import { Observation } from '../../model/model.observation';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Commune } from '../../model/model.commune';
import { Province } from '../../model/model.province';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
  pageProjets: any;
  motCle: string = "";
  pages: Array<number>;
  currentPage: number = 0;
  projet: Projet = new Projet();
  libelleSecteur: string;
  libelleStatut: string;
  libelleCommune: string;
  mode: number = 0;
  display: number = 0;
  secteurs: Array<Secteur>;
  statuts: Array<Statut>;
  communes: Array<Commune>;
  observation: Observation = new Observation();
  critere: string = "intitule";
  provinces: Array<Province>
  libelleProvince:string;

  constructor(public http: Http, public router: Router, public projetService: ProjetService,
    public observationService: ObservationService) { }

  ngOnInit() {
    this.projetService.getProjets()
      .subscribe(data => {
        this.pageProjets = data;
        this.pages = new Array(data.totalPages);
        this.currentPage = data.number;
        this.getAllSecteurs();
        this.getAllStatuts();
        this.getAllCommunes();
        this.getAllProvinces();
        this.libelleStatut = this.libelleSecteur = this.libelleCommune = this.libelleProvince = "";
      }
        , err => { console.log(err); })
  }

  ajouterProjet() {
    this.projet.secteur = this.getSecteurByName(this.secteurs, this.libelleSecteur);
    this.projet.statut = this.getStatutByName(this.statuts, this.libelleStatut);
    this.projet.commune = this.getCommuneByName(this.communes, this.libelleCommune);
    this.projet.province = this.getProvinceByName(this.provinces, this.libelleProvince)
    this.projetService.ajouterProjet(this.projet)
      .subscribe(data => { this.ngOnInit(); }
        , err => { console.log(err); });
    this.mode = 0;
    this.display = 0;

  }

  getSecteurByName(secteurs, libelleSecteur) {
    for (let index = 0; index < secteurs.length; index++) {
      if (secteurs[index].libelleSecteur === libelleSecteur) {
        return secteurs[index];
      }
    }
  }
  getStatutByName(statuts, libelleStatut) {
    for (let index = 0; index < statuts.length; index++) {
      if (statuts[index].libelleStatut === libelleStatut) {
        return statuts[index];
      }
    }
  }
  getCommuneByName(communes, libelleCommune) {
    for (let index = 0; index < communes.length; index++) {
      if (communes[index].libelleCommune === libelleCommune) {
        return communes[index];
      }
    }
  }
  getProvinceByName(provinces, libelleProvince) {
    for (let index = 0; index < provinces.length; index++) {
      if (provinces[index].libelleProvince === libelleProvince) {
        return provinces[index];
      }
    }
  }
  getAllProvinces(){
    this.projetService.getAllProvinces()
    .subscribe(data => {this.provinces = data; },
      err => { console.log(err); })
  }
  getAllSecteurs() {
    this.projetService.getAllSecteurs()
      .subscribe(data => { this.secteurs = data; },
        err => { console.log(err); })
  }
  getAllStatuts() {
    this.projetService.getAllStatuts()
      .subscribe(data => { this.statuts = data; },
        err => { console.log(err); })
  }
  getAllCommunes() {
    this.projetService.getAllCommunes()
      .subscribe(data => { this.communes = data; },
        err => { console.log(err); })
  }
  clickOnAjouterProjet() {
    this.mode = 0;
    this.display = 1;
    this.projet = new Projet();
    this.libelleSecteur = this.libelleStatut = this.libelleCommune = "";
  }
  clickOnAjouterObservation() {
    this.mode = 0;
    this.display = 1;
    this.observation = new Observation();
  }


  updateProjet() {
    this.projetService.updateProjet(this.projet)
      .subscribe(data => { this.ngOnInit(); }, err => { console.log(err); });
    this.mode = 1;
    this.display = 0;
    this.projet = new Projet();
  }
  onEditProjet(id: number) {
    this.mode = 1;
    this.display = 1;
    this.projetService.getProjet(id)
      .subscribe(data => {
      this.projet = data;
        this.libelleStatut = this.projet.statut.libelleStatut;
        this.libelleSecteur = this.projet.secteur.libelleSecteur;
        this.libelleCommune = this.projet.commune.libelleCommune;
        this.libelleProvince = this.projet.province.libelleProvince;
      }
        , err => { console.log(err); })
  }

  onDeleteProjet(projet: Projet) {
    if(confirm("Est vous sûr de vouloir supprimer le projet: "+projet.intitule)) {
    this.projetService.deleteProjet(projet.idProjet)
      .subscribe(data => {
        this.pageProjets.content.splice(
          this.pageProjets.content.indexOf(projet), 1
        );
        this.ngOnInit();
      }
        , err => { console.log(err); })
    }
  }

  chercher() {
    this.projetService.chercherProjet(this.critere, this.motCle)
      .subscribe(data => {
        this.pageProjets = data;
        this.pages = new Array(data.totalPages);
        this.currentPage = data.number;
      }, err => { console.log(err); })

  }
  retourAuComposant() {
    this.mode = 0;
    this.display = 0;
  }
  gotoPage(i: number) {
    this.projetService.getProjetsParPage(i)
      .subscribe(data => {
        this.pageProjets = data;
        this.pages = new Array(data.totalPages);
      }
        , err => { console.log(err); })
  }

  onDetailsProjet(idProjet: number) {
    this.router.navigate(['/detailsProjet/' + idProjet]);
  }

  exportCSV(){
    this.projetService.exportCSV()
    .subscribe(data => {
      this.download(data.data);
    }
      , err => { console.log(err); })
  }

  download(data) {
    var link = document.createElement('a');
    link.href = "data:application/octet-stream;base64," + btoa(data);
    link.download = "projects.csv";
    link.click();
  }
  isValidForm() {
    this.projet.secteur = this.getSecteurByName(this.secteurs, this.libelleSecteur);
    this.projet.statut = this.getStatutByName(this.statuts, this.libelleStatut);
    this.projet.commune = this.getCommuneByName(this.communes, this.libelleCommune);
    this.projet.province = this.getProvinceByName(this.provinces, this.libelleProvince);
    return this.projet.intitule && this.projet.intitule.length != 0
      && this.projet.commune
      && this.projet.province
      && this.projet.secteur && this.projet.statut
      && this.projet.dateAO
      && this.projet.montantProgramme && this.projet.montantProgramme != 0;

  }

}
