import { Type } from "./model.type";
import { Projet } from "./model.projet";

export class Document{
    idDocument?:number;
    nomDocument:string;
    dateAjout:Date;
    contenu:Blob;
    chargeurDocument:string;
    type:Type;
    projet:Projet;
}