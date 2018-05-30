import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../../model/model.entreprise';
import { EntrepriseService } from '../../services/entreprise.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { InputEntreprise } from '../../model/model.inputEntreprise';
import { LoginService } from '../../services/login.service';

@Injectable()
@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {
  entreprise: Entreprise = new Entreprise();
  pageEntreprises: any;
  pages: Array<number>;
  currentPage: number = 0;
  nomEntreprise: string;
  mode: number = 0;
  display: number = 0;
  idMarche: any;
  constructor(public http: Http, public entrepriseService: EntrepriseService, public router: Router,
    public loginService: LoginService) { }

  ngOnInit() {
    this.entrepriseService.getEntreprises()
      .subscribe(data => {
        console.log("on init");
        console.log(data);
        this.pageEntreprises = data;
        this.pages = new Array(data.totalPages);
        this.currentPage = data.number;
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
    console.log(this.mode);
  }

  chercher() {
    this.entrepriseService.chercherEntreprise(this.nomEntreprise)
      .subscribe(data => {
        this.pageEntreprises = data;
        this.pages = new Array(data.totalPages);
      }, err => {
        this.loginService.logout();
        this.router.navigateByUrl("/login");
      })
  }

  retourAuComposant() {
    this.mode = 0;
    this.display = 0;
  }

  ajouterEntreprise() {
    this.entrepriseService.ajoutEntreprise(this.entreprise)
      .subscribe(data => { this.ngOnInit(); }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        });
    this.mode = 0;
    this.display = 0;
    this.entreprise = new Entreprise();
  }


  clickOnAjouterEntreprise() {
    this.mode = 0;
    this.display = 1;
    this.entreprise = new Entreprise();
  }

  updateEntreprise() {
    this.display = 0;
    this.entrepriseService.updateEntreprise(this.entreprise)
      .subscribe(data => { this.ngOnInit(); }, err => {
        this.loginService.logout();
        this.router.navigateByUrl("/login");
      });
    this.mode = 1;
    this.entreprise = new Entreprise();
  }
  onEditEntreprise(id: number) {
    this.display = 1;
    this.mode = 1;
    this.entrepriseService.getEntreprise(id)
      .subscribe(data => { this.entreprise = data; console.log(data); }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
  }

  onDeleteEntreprise(entreprise: Entreprise) {
    if(confirm("Est vous sûr de vouloir supprimer l'entreprise': "+entreprise.nomEntreprise)) {
    this.entrepriseService.deleteEntreprise(entreprise.idEntreprise)
      .subscribe(data => {
        this.pageEntreprises.content.splice(
          this.pageEntreprises.content.indexOf(entreprise), 1
        );
        this.ngOnInit();
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
      }
  }

  gotoPage(i: number) {
    this.entrepriseService.getEntreprisesParPage(i)
      .subscribe(data => {
        this.pageEntreprises = data;
        this.pages = new Array(data.totalPages);
        this.currentPage = data.number;
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
  }

  isValidForm() {
    return this.entreprise.nomEntreprise && this.entreprise.adresseEntreprise
      && this.entreprise.nomEntreprise.length != 0
      && this.entreprise.adresseEntreprise.length != 0;
  }


}
