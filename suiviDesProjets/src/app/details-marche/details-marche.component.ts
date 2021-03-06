import { Component, OnInit } from '@angular/core';
import { Marche } from '../../model/model.marche';
import { MarcheService } from '../../services/marche.service';
import { EntrepriseService } from '../../services/entreprise.service';

import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Entreprise } from '../../model/model.entreprise';
import { InputEntreprise } from '../../model/model.inputEntreprise';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-details-marche',
  templateUrl: './details-marche.component.html',
  styleUrls: ['./details-marche.component.css']
})
export class DetailsMarcheComponent implements OnInit {
  marche: Marche = new Marche();
  public id: any;
  idMarche: any;
  mode: number = 0;
  display: number = 0;
  entreprise: Entreprise = new Entreprise();
  pageEntreprises: any;

  constructor(public http: Http, public marcheService: MarcheService,
    public entrepriseService: EntrepriseService,
    public router: Router, private route: ActivatedRoute,
    public loginService: LoginService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("---id : " + this.id + " type: " + typeof (this.id));
    this.marcheService.getMarche(this.id)
      .subscribe(data => {
        console.log(data);
        this.marche = data;
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
  }

  retourAuComposant() {
    this.router.navigate(['/detailsProjet/' + this.marche.projet.idProjet]);
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

  isValidForm() {
    return this.entreprise.nomEntreprise && this.entreprise.adresseEntreprise
      && this.entreprise.nomEntreprise.length != 0
      && this.entreprise.adresseEntreprise.length != 0;
  }
}
