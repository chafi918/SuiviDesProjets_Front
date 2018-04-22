import { Component, OnInit } from '@angular/core';
import { Contact } from '../../model/model.contact';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Entreprise } from '../../model/model.entreprise';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact:Contact=new Contact();
  entreprises:Array<Entreprise>;
  nomEntreprise:string;
  pageContacts:any;
  pages:Array<number>;
  currentPage:number=0;
  nomContact:string;
  mode:number=0;
  display:number=0;

  constructor(public http:Http,public contactService:ContactService,public router:Router) { }

  ngOnInit() {
    this.contactService.getContacts()
    .subscribe(data=>{
      console.log("on init");
      console.log(data);
      this.pageContacts=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
      this.getAllEntreprises();
      this.nomEntreprise = "";
    }
    ,err=>{console.log(err);})
    console.log(this.mode);
  }

  chercher(){
    this.contactService.chercherContact(this.nomContact)
    .subscribe(data=>{
      this.pageContacts=data;
      this.pages=new Array(data.totalPages);
    },err=>{console.log(err);})
  }

  ajouterContact(){
    this.contact.entreprise = this.getEntrepriseByName(this.entreprises, this.nomEntreprise);
    console.log(this.contact);
    this.contactService.ajouterContact(this.contact)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
    this.display=0
    this.contact = new Contact();
  }
  getAllEntreprises(){
    this.contactService.getAllEntreprises()
    .subscribe(data=>{this.entreprises=data;},
      err=>{console.log(err);})
  }

  
  getEntrepriseByName(entreprises, nomEntreprise){
    for (let index = 0; index < entreprises.length; index++) {
      if (entreprises[index].nomEntreprise === nomEntreprise) {
        return entreprises[index];
      }
    }
  }


  clickOnAjouterContact(){
    this.mode=0;
    this.display=1
    this.contact=new Contact();  
    this.nomEntreprise = "";
  }

  updateContact(){
    this.contact.entreprise = this.getEntrepriseByName(this.entreprises, this.nomEntreprise);
    this.contactService.updateContact(this.contact)
    .subscribe(data=>{this.ngOnInit();},err=>{console.log(err);});
    this.mode=1;
    this.display=0
    this.contact=new Contact();
  }
  onEditContact(id:number){
    this.mode=1;
    this.display=1
    this.contactService.getContact(id)
    .subscribe(data=>{this.contact=data; console.log(data);
      this.nomEntreprise = this.contact.entreprise.nomEntreprise;}
    ,err=>{console.log(err);})
  }

  onDeleteContact(contact:Contact){
    this.display=0;
    this.contactService.deleteContact(contact.idContact)
    .subscribe(data=>{
      this.pageContacts.content.splice(
        this.pageContacts.content.indexOf(contact),1
      );
      this.ngOnInit();
    }
    ,err=>{console.log(err);})
  }

  gotoPage(i:number){
    this.display=0;
    this.contactService.getContactsParPage(i)
    .subscribe(data=>{
      this.pageContacts=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;}
    ,err=>{console.log(err);})
  }

}
