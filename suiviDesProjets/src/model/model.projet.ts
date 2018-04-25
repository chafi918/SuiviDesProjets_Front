import { Secteur } from "./model.secteur";
import { Statut } from "./model.statut";
//import { Observation } from "./model.observation";

export class Projet{
    idProjet:number;
    intitule:string;
    montantProgramme:number;
    commune:string;
    dateOP:Date;
    chargeDuProjet:string;
    estProjetRoyal:boolean;
    dateCommTravaux:Date;
    dateAO:Date;
    estMasque:boolean;
    secteur:Secteur;
    statut:Statut;
   // observations:Array<Observation>;
}