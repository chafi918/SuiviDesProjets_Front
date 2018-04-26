import { Component, OnInit } from '@angular/core';
import { Projet } from '../../model/model.projet';
import { ProjetService } from '../../services/projets.service';
import {ObservationService} from '../../services/observation.service'
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { Observation } from '../../model/model.observation';
import { Marche } from '../../model/model.marche';

@Component({
  selector: 'app-details-projet',
  templateUrl: './details-projet.component.html',
  styleUrls: ['./details-projet.component.css']
})
export class DetailsProjetComponent implements OnInit {
  projet:Projet=new Projet();
  pageObservations:Array<Observation>
  pageMarches:Array<Marche>
  idProjet:any;

  constructor(public http:Http,public projetService:ProjetService,
    public observationService:ObservationService) {
   }

  ngOnInit() {
    this.projetService.idProjetEvent.subscribe(id => {
      this.idProjet = id;
      console.log("-------"+id);});
  }

}
