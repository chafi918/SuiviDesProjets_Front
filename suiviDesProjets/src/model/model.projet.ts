import { Secteur } from "./model.secteur";
import { Statut } from "./model.statut";
import { Commune } from "./model.commune";

export class Projet{
    idProjet:number;
    intitule:string;
    montantProgramme:number;
    commune:Commune;
    province:string;
    tauxAvancement:number;
    dateOP:Date;
    dateFinTravaux:Date;
    chargeDuProjet:string;
    estProjetRoyal:boolean;
    dateCommTravaux:Date;
    dateAO:Date;
    estMasque:boolean;
    secteur:Secteur;
    statut:Statut;
}