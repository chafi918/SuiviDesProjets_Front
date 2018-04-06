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
  constructor(public http:Http,public projetService:ProjetService) { }

  ngOnInit() {
   this.projetService.getProjets()
   .subscribe(data=>{this.pageProjets=data;}
   ,err=>{console.log(err);})
  }

  chercher(){
    
  }

}
