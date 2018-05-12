import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { JwtHelper } from "angular2-jwt";
import { isNullOrUndefined } from "util";
import { Router } from "@angular/router";

@Injectable()
export class CommonService {
    jwtToken: string = null;
    options = null;
    profil: any;
    isLogged:boolean=false;
    public router: Router;
    constructor() {
        this.reloadToken();
    }

    reloadToken() {
        if (this.jwtToken == null && 
            !isNullOrUndefined(localStorage.getItem('token'))
        ) {
            this.jwtToken = localStorage.getItem('token');
        }else{
            this.isLogged=false;
            this.options=null;
            return;
        }
        let jwtHelper = new JwtHelper();
        this.profil = jwtHelper.decodeToken(this.jwtToken).profil;
        const headers = new Headers();
        headers.append('authorization', this.jwtToken)
        this.options = new RequestOptions({ headers: headers });
        this.isLogged =true;
        console.log("reload composant with, token: " + this.jwtToken + "and options: " + this.options);
    }
}