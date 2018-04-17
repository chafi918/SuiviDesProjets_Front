import { Division } from "./model.division";
import { Profil } from "./model.profil";

export class Utilisateur{
    idUser:number;
    nomUser:string;
    prenomUser:string;
    mailUser:string;
    loginUser:string;
    mdpUser:string;
    responsabilite:string;
   division:Division;
   profil:Profil;
   estActive:boolean=true; 
}