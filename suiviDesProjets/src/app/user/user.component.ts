import { Component, OnInit } from '@angular/core';
import { Http} from '@angular/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
pageUsers:any;
  constructor(public http:Http , public userService:UserService) {
   
   }

   ngOnInit() {

    this.userService.getUsers()
    .subscribe(data=>{this.pageUsers=data; console.log('data = ', data);}
    ,err=>{console.log(err);})
  }

}
