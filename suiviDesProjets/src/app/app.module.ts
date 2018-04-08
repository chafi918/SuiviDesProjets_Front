import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProjetsComponent } from './projets/projets.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ProjetService } from '../services/projets.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { UserComponent } from './user/user.component';
import { UserService } from '../services/user.service';
import { DivisionComponent } from './division/division.component';

const appRoutes:Routes=[
  {path:'projets', component:ProjetsComponent},
  {path:'users', component:UserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProjetsComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    UserComponent,
    DivisionComponent
  ],
  imports: [
    BrowserModule,HttpModule,RouterModule.forRoot(appRoutes),FormsModule
  ],
  providers: [ProjetService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
