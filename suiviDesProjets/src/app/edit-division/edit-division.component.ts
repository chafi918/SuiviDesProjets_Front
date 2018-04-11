import { Component, OnInit } from '@angular/core';
import { Division } from '../../model/model.division';
import { ActivatedRoute, Router } from '@angular/router';
import { DivisionService } from '../../services/division.service';

@Component({
  selector: 'app-edit-division',
  templateUrl: './edit-division.component.html',
  styleUrls: ['./edit-division.component.css']
})
export class EditDivisionComponent implements OnInit {
  division:Division = new Division();
  libelleDivision:string;
  pageDivisions:any;
  idDivision:number;
  pages:Array<number>;
  currentPage:number=0;

  constructor(public activatedRoute:ActivatedRoute,public divisionService:DivisionService,public router:Router) { 
    this.idDivision=activatedRoute.snapshot.params['id'];
    
  }

  ngOnInit() {
    this.divisionService.getDivisions()
    .subscribe(data=>{this.pageDivisions=data;
      this.pages=new Array(data.totalPages);}
    ,err=>{console.log(err);})
    
    this.divisionService.getDivision(this.idDivision)
    .subscribe(data=>{this.division=data; console.log(data);}
    ,err=>{console.log(err);})
  }

  chercher(){
    this.divisionService.chercherDivision(this.libelleDivision)
    .subscribe(data=>{
      this.pageDivisions=data;
    },err=>{console.log(err);})
  }

  updateDivision(){
    this.divisionService.updateDivision(this.division)
    .subscribe(data=>{
      this.ngOnInit();}
    ,err=>{console.log(err);})
  }

  onEditDivision(id:number){
    this.router.navigate(['editDivision',id]);
    this.divisionService.getDivision(id).subscribe(data => {
      this.division = data;
    });
  }

  gotoPage(i:number){
    this.divisionService.getDivisionsParPage(i)
    .subscribe(data=>{
      this.pageDivisions=data;
      this.pages=new Array(data.totalPages);}
    ,err=>{console.log(err);})
  }

}
