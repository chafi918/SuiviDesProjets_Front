import { Component, OnInit } from '@angular/core';
import { Division } from '../../model/model.division';
import { DivisionService } from '../../services/division.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
  division: Division = new Division();
  pageDivisions: any;
  pages: Array<number>;
  currentPage: number = 0;
  libelleDivision: string;
  mode: number = 0;
  display: number = 0;

  constructor(public http: Http, public divisionService: DivisionService, public router: Router,
    public loginService: LoginService) { }

  ngOnInit() {
    this.divisionService.getDivisions()
      .subscribe(data => {
        console.log("on init");
        console.log(data.content);
        this.pageDivisions = data;
        this.pages = new Array(data.totalPages);
        this.currentPage = data.number;
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
    console.log(this.mode);
  }

  initializeComponent(mode = 0) {
    this.mode = 0;
    this.divisionService.getDivisions()
      .subscribe(data => {
        console.log("on init");
        console.log(data);
        this.pageDivisions = data;
        this.pages = new Array(data.totalPages);
        this.currentPage = data.number;
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
    console.log(mode);
  }

  chercher() {
    this.divisionService.chercherDivision(this.libelleDivision)
      .subscribe(data => {
        this.pageDivisions = data;
        this.pages = new Array(data.totalPages);
      }, err => {
        this.loginService.logout();
        this.router.navigateByUrl("/login");
      })
  }

  ajouterDivision() {
    console.log(this.division);
    this.divisionService.ajouterDivision(this.division)
      .subscribe(data => { this.ngOnInit(); }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        });
    this.display = 0;
    this.mode = 0;

  }

  retourAuComposant() {
    this.mode = 0;
    this.display = 0;
  }

  clickOnAjouterDivision() {
    this.mode = 0;
    this.display = 1;
    this.division = new Division();
  }

  updateDivision() {
    this.divisionService.updateDivision(this.division)
      .subscribe(data => { this.ngOnInit(); }, err => {
        this.loginService.logout();
        this.router.navigateByUrl("/login");
      });
    this.mode = 1;
    this.display = 0;
    this.division = new Division();
    this.ngOnInit();
  }
  onEditDivision(id: number) {
    this.mode = 1;
    this.display = 1;
    this.divisionService.getDivision(id)
      .subscribe(data => { this.division = data; console.log(data); }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
  }

  onDeleteDivision(division: Division) {
    if(confirm("Est vous sûr de vouloir supprimer la division: "+division.libelleDivision)) {
    this.divisionService.deleteDivision(division.idDivision)
      .subscribe(data => {
        this.pageDivisions.content.splice(
          this.pageDivisions.content.indexOf(division), 1
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
    this.divisionService.getDivisionsParPage(i)
      .subscribe(data => {
        this.pageDivisions = data;
        this.pages = new Array(data.totalPages);
        this.currentPage = i;
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
  }


  isValidForm() {
    return this.division.libelleDivision && this.division.libelleDivision.length != 0;
  }
}
