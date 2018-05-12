import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Contact } from "../model/model.contact";
import { CommonService } from "./common.service";


@Injectable()
export class ContactService extends CommonService{
    constructor(public http: Http) {
        super();
    }

    getContactByMarcheId(idMarche: any) {
        return this.http.get("http://localhost:8080/contact/marche?idMarche=" + idMarche, this.options)
            .map(resp => resp.json())
    }
    getContacts() {
        return this.http.get("http://localhost:8080/contact/getContacts", this.options)
            .map(resp => resp.json());
    }

    getContactsParPage(page: number) {
        return this.http.get("http://localhost:8080/contact/getContacts?page=" + page, this.options)
            .map(resp => resp.json());
    }

    getContact(id: number) {
        return this.http.get("http://localhost:8080/contact/" + id, this.options)
            .map(resp => resp.json());
    }

    getContactByEntrepriseId(idEntreprise: number) {
        return this.http.get("http://localhost:8080/contact/entreprise?idEntreprise=" + idEntreprise, this.options)
            .map(resp => resp.json());
    }

    getAllEntreprises() {
        return this.http.get("http://localhost:8080/entreprise/entreprises", this.options)
            .map(resp => resp.json());
    }

    ajouterContact(contact: Contact) {
        return this.http.post("http://localhost:8080/contact/ajout", contact, this.options)
            .map(resp => resp);
    }

    updateContact(contact: Contact) {
        return this.http.put("http://localhost:8080/contact/" + contact.idContact, contact, this.options)
            .map(resp => resp);
    }

    deleteContact(id: number) {
        return this.http.delete("http://localhost:8080/contact/" + id, this.options)
            .map(resp => resp.json());
    }

    chercherContact(nomContact: string) {
        return this.http.get("http://localhost:8080/contact/name?name=" + nomContact, this.options)
            .map(resp => resp.json());
    }

    chercherContactOfEntreprise(nomContact: string, idEntreprise: number) {
        return this.http
            .get("http://localhost:8080/contact/byEntreprise/?name=" + nomContact + "&idEntreprise=" + idEntreprise, this.options)
            .map(resp => resp.json());

    }
}