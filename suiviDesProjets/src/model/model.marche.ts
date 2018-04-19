import { Nature } from "./model.nature";
import { Entreprise } from "./model.entreprise";

export class Marche{
    idMarche:number;
    numeroMarche:string;
    montantMarche:number;
    montantTravauxRealises:number;
    delaiExecution:string;
    tauxAvancement:number;
    nature:Nature;
    entreprise:Entreprise;
}