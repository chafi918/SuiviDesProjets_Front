import { Secteur } from "./model.secteur";
import { Statut } from "./model.statut";
import { Commune } from "./model.commune";
import { Province } from "./model.province";

export class Projet{
    idProjet:number;
    intitule:string;
    montantProgramme:number;
    commune:Commune;
    province:Province;
    anneeDeProgrammation:number;
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