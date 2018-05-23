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
        return this.http.get(this.backEndUrl +"/contact/marche?idMarche=" + idMarche, this.options)
            .map(resp => resp.json())
    }
    getContacts() {
        return this.http.get(this.backEndUrl +"/contact/getContacts", this.options)
            .map(resp => resp.json());
    }

    getContactsParPage(page: number) {
        return this.http.get(this.backEndUrl +"/contact/getContacts?page=" + page, this.options)
            .map(resp => resp.json());
    }

    getContact(id: number) {
        return this.http.get(this.backEndUrl +"/contact/" + id, this.options)
            .map(resp => resp.json());
    }

    getContactByEntrepriseId(idEntreprise: number) {
        return this.http.get(this.backEndUrl +"/contact/entreprise?idEntreprise=" + idEntreprise, this.options)
            .map(resp => resp.json());
    }

    getAllEntreprises() {
        return this.http.get(this.backEndUrl +"/entreprise/entreprises", this.options)
            .map(resp => resp.json());
    }

    ajouterContact(contact: Contact) {
        return this.http.post(this.backEndUrl +"/contact/ajout", contact, this.options)
            .map(resp => resp);
    }

    updateContact(contact: Contact) {
        return this.http.put(this.backEndUrl +"/contact/" + contact.idContact, contact, this.options)
            .map(resp => resp);
    }

    deleteContact(id: number) {
        return this.http.delete(this.backEndUrl +"/contact/" + id, this.options)
            .map(resp => resp.json());
    }

    chercherContact(nomContact: string) {
        return this.http.get(this.backEndUrl +"/contact/name?name=" + nomContact, this.options)
            .map(resp => resp.json());
    }

    chercherContactOfEntreprise(nomContact: string, idEntreprise: number) {
        return this.http
            .get(this.backEndUrl +"/contact/byEntreprise/?name=" + nomContact + "&idEntreprise=" + idEntreprise, this.options)
            .map(resp => resp.json());

    }
}