import { Component, OnInit} from '@angular/core';
import { Projet } from '../../model/model.projet';
import { ProjetService } from '../../services/projets.service';
import {ObservationService} from '../../services/observation.service'
import {Http} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observation } from '../../model/model.observation';
import { Marche } from '../../model/model.marche';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-details-projet',
  templateUrl: './details-projet.component.html',
  styleUrls: ['./details-projet.component.css']
})
export class DetailsProjetComponent implements OnInit {
  projet:Projet =  new Projet();
  public id:any;

  constructor(public http:Http,public projetService:ProjetService,
    public observationService:ObservationService,
    public router:Router, private route:ActivatedRoute,
  public loginService:LoginService) {
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("---id : " + this.id + " type: " + typeof(this.id));
    this.projetService.getProjet(this.id)
    .subscribe(data=>{
      console.log(data);
      this.projet = data;
    }
    ,err=>{this.loginService.logout();
      this.router.navigateByUrl("/login");})
  }

  retourAuComposant(){
    this.router.navigate(['/projets']);
  }

}
