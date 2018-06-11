import { Component, OnInit } from '@angular/core';
import { Province } from '../../model/model.province';
import { ProvinceService } from '../../services/province.service';
import {Http} from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.css']
})
export class ProvinceComponent implements OnInit {
  province:Province=new Province();
  pageProvinces:any;
  pages:Array<number>;
  currentPage:number=0;
  libelleProvince:string;
  mode:number=0;
  display:number=0;

  constructor(public http:Http,public router:Router,public provinceService:ProvinceService) { }

  ngOnInit() {
    this.provinceService.getProvinces()
    .subscribe(data=>{
      console.log("on init");
      console.log(data.content);
      this.pageProvinces=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
    }
    ,err=>{console.log(err);})
    console.log(this.mode);
  }

  chercher(){
    this.provinceService.chercherProvince(this.libelleProvince)
    .subscribe(data=>{
      this.pageProvinces=data;
      this.pages=new Array(data.totalPages);
    },err=>{console.log(err);})
  }

  ajouterProvince(){
    console.log(this.province);
    this.provinceService.ajouterProvince(this.province)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.display=0;
    this.mode=0;
    
  }

  retourAuComposant(){
    this.mode=0;
    this.display=0;
  }
  
  clickOnAjouterProvince(){
    this.mode=0;
    this.display=1;
    this.province=new Province(); 
  }

  updateProvince(){
    this.provinceService.updateProvince(this.province)
    .subscribe(data=>{this.ngOnInit();},err=>{console.log(err);});
    this.mode=1;
    this.display=0;
    this.province=new Province(); 
    this.ngOnInit();
  }
  onEditProvince(id:number){
    this.mode=1;
    this.display=1;
    this.provinceService.getProvince(id)
    .subscribe(data=>{this.province=data; console.log(data);}
    ,err=>{console.log(err);})
  }

  onDeleteProvince(province:Province){
    if(confirm("Est vous sûr de vouloir supprimer la province: "+province.libelleProvince)) {
      this.provinceService.deleteProvince(province.idProvince)
      .subscribe(data=>{
        this.pageProvinces.content.splice(
          this.pageProvinces.content.indexOf(province),1
        );
        this.ngOnInit();
      }
      ,err=>{console.log(err);})
    }
  }

  gotoPage(i:number){
    this.provinceService.getProvincesParPage(i)
    .subscribe(data=>{
      this.pageProvinces=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = i;}
    ,err=>{console.log(err);})
  }


  isValidForm(){
    return this.province.libelleProvince && this.province.libelleProvince.length != 0;
  }

}
