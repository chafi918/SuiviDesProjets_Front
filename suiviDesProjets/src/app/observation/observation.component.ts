import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { ObservationService } from '../../services/observation.service';
import { Observation } from '../../model/model.observation';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {
  observation:Observation;
  mode:number=0;
  display:number=0;
  pageObservations:any;
  pages:Array<number>;
  currentPage:number=0;

  constructor(public http:Http,public observationService:ObservationService,public router:Router) { }

  ngOnInit() {
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
    this.observationService.ajouterObservation(this.observation)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
	  this.display=0;
    this.observation=new Observation();
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
    this.observationService.deleteObservation(observation.idObservation)
    .subscribe(data=>{  this.pageObservations.content.splice(
      this.pageObservations.content.indexOf(observation),1
    );
  }
    ,err=>{console.log(err);})
  }

  gotoPage(i:number){
    this.observationService.getObservationsParPage(i)
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
