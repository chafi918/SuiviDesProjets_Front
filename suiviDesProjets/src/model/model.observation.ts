import { Projet } from "./model.projet";

export class Observation{
    idObservation:number;
    observation:string;
    dateObservation:Date;
    nomObservant:string;
    projet:Projet;
}