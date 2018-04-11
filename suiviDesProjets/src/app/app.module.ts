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
import { DivisionService } from '../services/division.service';
import { EditDivisionComponent } from './edit-division/edit-division.component';

const appRoutes:Routes=[
  {path:'projets', component:ProjetsComponent},
  {path:'users', component:UserComponent},
  {path:'divisions', component:DivisionComponent},
  {path:'editDivision/:id',component:EditDivisionComponent},
  {path:'',redirectTo:'/projets',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProjetsComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    UserComponent,
    DivisionComponent,
    EditDivisionComponent
  ],
  imports: [
    BrowserModule,HttpModule,RouterModule.forRoot(appRoutes),FormsModule
  ],
  providers: [ProjetService, UserService,DivisionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
