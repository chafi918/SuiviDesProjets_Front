import { Nature } from "./model.nature";
import { Entreprise } from "./model.entreprise";
import { Projet } from "./model.projet";

export class Marche{
    idMarche:number;
    numeroMarche:string;
    montantMarche:number;
    montantTravauxRealises:number;
    montantEmis:number;
    delaiExecution:string;
    dateOS:Date;
    dateReceptionProvisoire:Date;
    tauxAvancement:number;
    nature:Nature;
    entreprise:Entreprise;
    projet:Projet;
}