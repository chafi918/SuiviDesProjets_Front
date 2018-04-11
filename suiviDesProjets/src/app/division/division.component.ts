import { Component, OnInit } from '@angular/core';
import { Division } from '../../model/model.division';
import { DivisionService } from '../../services/division.service';
import {Http} from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
  division:Division=new Division();
  pageDivisions:any;
  pages:Array<number>;
  currentPage:number=0;
  libelleDivision:string;

  constructor(public http:Http,public divisionService:DivisionService,public router:Router) { }

  ngOnInit() {
    this.divisionService.getDivisions()
    .subscribe(data=>{
      this.pageDivisions=data;
      this.pages=new Array(data.totalPages);}
    ,err=>{console.log(err);})
  }

  chercher(){
    this.divisionService.chercherDivision(this.libelleDivision)
    .subscribe(data=>{
      this.pageDivisions=data;
    },err=>{console.log(err);})
  }

  ajouterDivision(){
    this.divisionService.ajouterDivision(this.division)
    .subscribe(data=>{console.log(data);
      this.division=data;
    }
      ,err=>{console.log(err);});
    
  }

  onEditDivision(id:number){
    this.router.navigate(['editDivision',id]);
  }

  onDeleteDivision(division:Division){
    this.divisionService.deleteDivision(division.idDivision)
    .subscribe(data=>{
      this.pageDivisions.content.splice(
        this.pageDivisions.content.indexOf(division),1
      );
    }
    ,err=>{console.log(err);})
  }

  gotoPage(i:number){
    this.divisionService.getDivisionsParPage(i)
    .subscribe(data=>{
      this.pageDivisions=data;
      this.pages=new Array(data.totalPages);}
    ,err=>{console.log(err);})
  }

}
