import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { Utilisateur } from '../../model/model.user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent implements OnInit {
  mode: number = 0;
  constructor(private loginService: LoginService,
    public router: Router) { }

  ngOnInit() {
  }

  onLogin(data) {
    let user = new Utilisateur();
    user.mdpUser = data.password;
    user.loginUser = data.username;
    this.loginService.login(user)
      .subscribe(
        data => {
          let jwtToken = data.headers.get('authorization');
          this.router.navigateByUrl("/projets");
          this.loginService.saveToken(jwtToken);
          console.log(jwtToken);
          console.log(data);
        }
        , err => {
          this.mode = 1;
          console.log(err);
        }
      )
    console.log(user);
  }
}
