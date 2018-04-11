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

  constructor(public http:Http,public divisionService:DivisionService,public router:Router) { }

  ngOnInit() {
    this.divisionService.getDivisions()
    .subscribe(data=>{this.pageDivisions=data;}
    ,err=>{console.log(err);})
  }

  ajouterDivision(){
    this.divisionService.ajouterDivision(this.division)
    .subscribe(data=>{console.log(data);}
      ,err=>{console.log(err);});

    this.ngOnInit();
  }

  onEditDivision(id:number){
    this.router.navigate(['editDivision',id]);
  }

}
