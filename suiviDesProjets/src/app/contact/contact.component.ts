import { Component, OnInit } from '@angular/core';
import { Contact } from '../../model/model.contact';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact:Contact=new Contact();
  pageContacts:any;
  pages:Array<number>;
  currentPage:number=0;
  nomContact:string;
  mode:number=0;

  constructor(public http:Http,public contactService:ContactService,public router:Router) { }

  ngOnInit() {
    this.contactService.getContacts()
    .subscribe(data=>{
      console.log("on init");
      console.log(data);
      this.pageContacts=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;
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
    console.log(this.contact);
    this.contactService.ajouterContact(this.contact)
    .subscribe(data=>{this.ngOnInit();}
        ,err=>{console.log(err);});
    this.mode=0;
    
  }


  clickOnAjouterContact(){
    this.mode=0;
    this.contact=new Contact();  
  }

  updateContact(){
    this.mode=1;
    this.contactService.updateContact(this.contact)
    .subscribe(data=>{this.ngOnInit();},err=>{console.log(err);});
    this.mode=1;
    this.contact=new Contact();
    this.ngOnInit();
  }
  onEditContact(id:number){
    this.mode=1;
    this.contactService.getContact(id)
    .subscribe(data=>{this.contact=data; console.log(data);}
    ,err=>{console.log(err);})
  }

  onDeleteContact(contact:Contact){
    this.contactService.deleteContact(contact.idContact)
    .subscribe(data=>{
      this.pageContacts.content.splice(
        this.pageContacts.content.indexOf(contact),1
      );
    }
    ,err=>{console.log(err);})
  }

  gotoPage(i:number){
    this.contactService.getContactsParPage(i)
    .subscribe(data=>{
      this.pageContacts=data;
      this.pages=new Array(data.totalPages);
      this.currentPage = data.number;}
    ,err=>{console.log(err);})
  }


}
