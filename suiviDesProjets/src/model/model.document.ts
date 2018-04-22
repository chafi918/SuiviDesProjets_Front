import { Type } from "./model.type";

export class Document{
    idDocument:number;
    nomDocument:string;
    dateAjout:Date;
    contenu:File;
    chargeurDocument:string;
    type:Type;
}