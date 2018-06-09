import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../model/model.contact';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Entreprise } from '../../model/model.entreprise';
import { EntrepriseService } from '../../services/entreprise.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact: Contact = new Contact();
  entreprises: Array<Entreprise>;
  nomEntreprise: string;
  pageContacts: any;
  pages: Array<number>;
  currentPage: number = 0;
  nomContact: string;
  mode: number = 0;
  display: number = 0;
  idMarche: any;
  entreprise: Entreprise;

  constructor(public http: Http,
    public contactService: ContactService,
    public entrepriseService: EntrepriseService,
    public router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService) { }

  ngOnInit() {
    this.idMarche = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.idMarche);
    if (this.idMarche == undefined || this.idMarche == 0) {
      this.defaultInit();
    } else {
      this.getEntrepriseByMarche();
      this.getContactByMarche();
    }
    this.getAllEntreprises();
  }
  retourAuComposant() {
    this.mode = 0;
    this.display = 0;
  }

  defaultInit() {
    this.contactService.getContacts()
      .subscribe(data => {
        this.pageContacts = data;
        this.pages = new Array(data.totalPages);
        this.currentPage = data.number;
      }, err => {
        this.loginService.logout();
        this.router.navigateByUrl("/login");
      });
  }

  getEntrepriseByMarche() {
    this.entrepriseService.getEntrepriseParMarche(this.idMarche)
      .subscribe(data => {
        console.log("getEntrepriseParMarche: " + data);
        this.entreprise = data;
      }, err => {
        this.loginService.logout();
        this.router.navigateByUrl("/login");
      })
  }

  getContactByMarche() {
    this.contactService.getContactByMarcheId(this.idMarche)
      .subscribe(data => {
        this.pageContacts = data;
        this.pages = new Array(data.totalPages);
        this.currentPage = data.number;
      }, err => {
        this.loginService.logout();
        this.router.navigateByUrl("/login");
      });
  }

  chercher() {
    if (this.idMarche == undefined || this.idMarche == 0) {
      this.contactService.chercherContact(this.nomContact)
        .subscribe(data => {
          this.pageContacts = data;
          this.pages = new Array(data.totalPages);
        }, err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
    } else {
      this.contactService.chercherContactOfEntreprise(this.nomContact, this.entreprise.idEntreprise)
        .subscribe(data => {
          this.pageContacts = data;
          this.pages = new Array(data.totalPages);
        }, err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
    }


  }

  ajouterContact() {
    if (this.idMarche == undefined || this.idMarche == 0) {
      this.contact.entreprise = this.getEntrepriseByName();
    } else {
      this.contact.entreprise = this.entreprise;
    }

    console.log(this.contact);
    this.contactService.ajouterContact(this.contact)
      .subscribe(data => { this.ngOnInit(); }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        });
    this.mode = 0;
    this.display = 0
    this.contact = new Contact();
  }
  getAllEntreprises() {
    this.contactService.getAllEntreprises()
      .subscribe(data => { this.entreprises = data; },
        err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
  }


  getEntrepriseByName() {
    for (let index = 0; index < this.entreprises.length; index++) {
      if (this.entreprises[index].nomEntreprise === this.nomEntreprise) {
        return this.entreprises[index];
      }
    }
  }


  clickOnAjouterContact() {
    this.mode = 0;
    this.display = 1
    this.contact = new Contact();
    this.nomEntreprise = "";
  }

  updateContact() {
    if (this.idMarche == undefined || this.idMarche == 0) {
      this.contact.entreprise = this.getEntrepriseByName();
    } else {
      this.contact.entreprise = this.entreprise;
    }
    this.contactService.updateContact(this.contact)
      .subscribe(data => { this.ngOnInit(); }, err => {
        this.loginService.logout();
        this.router.navigateByUrl("/login");
      });
    this.mode = 1;
    this.display = 0
    this.contact = new Contact();
  }
  onEditContact(id: number) {
    this.mode = 1;
    this.display = 1
    this.contactService.getContact(id)
      .subscribe(data => {
        this.contact = data; console.log(data);
        this.nomEntreprise = this.contact.entreprise.nomEntreprise;
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
  }

  onDeleteContact(contact: Contact) {
    if(confirm("Est vous sûr de vouloir supprimer le contact: "+contact.nomContact)) {
    this.display = 0;
    this.contactService.deleteContact(contact.idContact)
      .subscribe(data => {
        this.pageContacts.content.splice(
          this.pageContacts.content.indexOf(contact), 1
        );
        this.ngOnInit();
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
      }
  }

  gotoPage(i: number) {
    this.display = 0;
    this.contactService.getContactsParPage(i)
      .subscribe(data => {
        this.pageContacts = data;
        this.pages = new Array(data.totalPages);
        this.currentPage = i;
      }
        , err => {
          this.loginService.logout();
          this.router.navigateByUrl("/login");
        })
  }

  isValidForm() {
    return this.contact.nomContact
      && this.contact.nomContact.length != 0
      && this.contact.mailContact && this.contact.mailContact.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      && this.contact.telephone && this.contact.telephone.match("^0{1}[0-9]{9}$")
      && this.contact.responsabilite.length != 0;
  }
}
