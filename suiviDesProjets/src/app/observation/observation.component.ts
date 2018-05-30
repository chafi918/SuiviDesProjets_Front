import { Component, OnInit, Input } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ObservationService } from '../../services/observation.service';
import { Observation } from '../../model/model.observation';
import { InputObservation } from '../../model/model.inputObservation';
import { ProjetService } from '../../services/projets.service';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {
  observation:Observation = new Observation();
  mode:number=0;
  display:number=0;
  pageObservations:any;
  pages:Array<number>;
  currentPage:number=0;
  idProjet:number;

  constructor(public http:Http,public observationService:ObservationService,
    public router:Router, private route:ActivatedRoute, public projetService:ProjetService) { }

  ngOnInit() {
    this.idProjet = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.idProjet);
    this.initFromParent();
  }

  retourAuComposant(){
    this.mode=0;
    this.display=0;
  }
  
  initFromParent(){
    this.observationService.getObservationsByProjet(this.idProjet, this.currentPage)
    .subscribe(
      data=>{
        this.pageObservations=data;
        this.pages=new Array(data.totalPages);
        this.currentPage = data.number;
      } ,err=>{console.log(err);}
    )
  }
  
  initComponent(){
    this.observationService.getObservations()
    .subscribe(data=>{
      console.log("on init");
      console.log(data);
      this.pageObservations=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
    }
    ,err=>{console.log(err);})
    console.log(this.mode);
  }

  ajouterObservation(){
    let input:InputObservation = new InputObservation();
    input.idProjet = this.idProjet;
    input.observation = this.observation;
    this.observationService.ajouterObservation(input)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
	  this.display=0;
    this.observation=new Observation();
  }

  associerProjet(){
    this.projetService.getProjet(this.idProjet)
    .subscribe(data=>{
      console.log(data);
      this.observation.projet = data;
    }, err=>{console.log(err);})
  }
  
  clickOnAjouterObservation(){
    this.mode=0;
	  this.display=1;
    this.observation=new Observation();
  }

  updateObservation(){
    this.observationService.updateObservation(this.observation)
    .subscribe(data=>{this.ngOnInit();},err=>{console.log(err);});
    this.mode=0;
	  this.display=0;
    this.observation=new Observation();
  }

  onEditObservation(id:number){
    this.mode=1;
	  this.display=1;
    this.observationService.getObservation(id)
    .subscribe(data=>{this.observation=data; 
     console.log(data);}
    ,err=>{console.log(err);})
  }

  onDeleteObservation(observation:Observation){
    if(confirm("Est vous sûr de vouloir supprimer cette observation ? ")) {
    this.observationService.deleteObservation(observation.idObservation)
    .subscribe(data=>{  
      this.pageObservations.content.splice(
      this.pageObservations.content.indexOf(observation),1);
      this.ngOnInit();
  }
    ,err=>{console.log(err);})
  }
  }

  gotoPage(i:number){
    this.observationService.getObservationsByProjet(this.idProjet, i)
    .subscribe(data=>{
      this.pageObservations=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;}
    ,err=>{console.log(err);})
  }

  
  isValidForm(){
    return this.observation.observation && this.observation.observation.length != 0
       && this.observation.nomObservant && this.observation.nomObservant.length != 0;
  }



}
