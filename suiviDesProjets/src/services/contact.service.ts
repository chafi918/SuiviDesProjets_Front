import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Contact } from "../model/model.contact";


@Injectable()
export class ContactService {
    constructor(public http: Http) {

    }

    getContactByMarcheId(idMarche: any) {
        return this.http.get("http://localhost:8080/contact/marche?idMarche=" + idMarche)
            .map(resp => resp.json())
    }
    getContacts() {
        return this.http.get("http://localhost:8080/contact/getContacts")
            .map(resp => resp.json());
    }

    getContactsParPage(page: number) {
        return this.http.get("http://localhost:8080/contact/getContacts?page=" + page)
            .map(resp => resp.json());
    }

    getContact(id: number) {
        return this.http.get("http://localhost:8080/contact/" + id)
            .map(resp => resp.json());
    }

    getContactByEntrepriseId(idEntreprise: number) {
        return this.http.get("http://localhost:8080/contact/entreprise?idEntreprise=" + idEntreprise)
            .map(resp => resp.json());
    }

    getAllEntreprises() {
        return this.http.get("http://localhost:8080/entreprise/entreprises")
            .map(resp => resp.json());
    }

    ajouterContact(contact: Contact) {
        return this.http.post("http://localhost:8080/contact/ajout", contact)
            .map(resp => resp);
    }

    updateContact(contact: Contact) {
        return this.http.put("http://localhost:8080/contact/" + contact.idContact, contact)
            .map(resp => resp);
    }

    deleteContact(id: number) {
        return this.http.delete("http://localhost:8080/contact/" + id)
            .map(resp => resp.json());
    }

    chercherContact(nomContact: string) {
        return this.http.get("http://localhost:8080/contact/name?name=" + nomContact)
            .map(resp => resp.json());
    }

    chercherContactOfEntreprise(nomContact: string, idEntreprise: number) {
        return this.http
            .get("http://localhost:8080/contact/byEntreprise/?name=" + nomContact + "&idEntreprise=" + idEntreprise)
            .map(resp => resp.json());

    }
}