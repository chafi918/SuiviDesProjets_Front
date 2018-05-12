import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";
import { isNullOrUndefined } from "util";

@Injectable()
export class LoggedVerif implements CanActivate{

    canActivate(){
        console.log("can Activate");
        let jwtToken = localStorage.getItem('token');
        return !isNullOrUndefined(jwtToken);
    }
}