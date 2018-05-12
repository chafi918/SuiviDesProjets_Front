import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";
import { isNullOrUndefined } from "util";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AdminControl implements CanActivate{
    constructor(private router:Router){

    }
    canActivate(){
        console.log("can Activate admin");
        let jwtToken = localStorage.getItem('token');
        let jwtHelper = new JwtHelper();
        let profil = jwtHelper.decodeToken(jwtToken).profil[0].authority;
        console.log(profil);
        if (profil == "ADMIN") {
            return true;
        }else{
            window.alert("Vous n'avez pas les droits pour aller vers le panel!");
            this.router.navigateByUrl("");
            return false;
        }
    }
}