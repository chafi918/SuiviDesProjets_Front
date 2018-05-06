import { Secteur } from "./model.secteur";
import { Statut } from "./model.statut";

export class Projet{
    idProjet:number;
    intitule:string;
    montantProgramme:number;
    commune:string;
    province:string;
    tauxAvancement:number;
    dateOP:Date;
    chargeDuProjet:string;
    estProjetRoyal:boolean;
    dateCommTravaux:Date;
    dateAO:Date;
    estMasque:boolean;
    secteur:Secteur;
    statut:Statut;
}