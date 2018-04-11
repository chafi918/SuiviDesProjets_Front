import { Component, OnInit } from '@angular/core';
import { Http} from '@angular/http';
import { UrlResolver } from '@angular/compiler';
import "rxjs/add/operator/map";
import { ProjetService } from '../../services/projets.service';
@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
   pageProjets:any;
   motCle:string="";
   pages:Array<number>;
   currentPage:number=0;
  constructor(public http:Http,public projetService:ProjetService) { }

  ngOnInit() {
   this.projetService.getProjets()
   .subscribe(data=>{
     this.pageProjets=data;
     this.pages=new Array(data.totalPages);}
    ,err=>{console.log(err);})
  }

  chercher(){
    
  }

  gotoPage(i:number){
    this.projetService.getProjetsParPage(i)
    .subscribe(data=>{
      this.pageProjets=data;
      this.pages=new Array(data.totalPages);}
    ,err=>{console.log(err);})
  }

}
