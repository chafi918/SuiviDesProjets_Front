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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { SecteurComponent } from './secteur/secteur.component';
import { SecteurService } from '../services/secteur.service';
import { StatutComponent } from './statut/statut.component';
import { StatutService } from '../services/statut.service';
import { ProfilComponent } from './profil/profil.component';
import { ProfilService } from '../services/profil.service';
import { TypeDocumentComponent } from './type-document/type-document.component';
import { TypeDocService } from '../services/typeDoc.service';
import { ContactService } from '../services/contact.service';



const appRoutes:Routes=[
  {path:'projets', component:ProjetsComponent},
  {path:'users', component:UserComponent},
  {path:'divisions', component:DivisionComponent},
  {path:'secteurs' , component:SecteurComponent},
  {path:'statuts', component:StatutComponent},
  {path:'profils',component:ProfilComponent},
  {path:'types',component:TypeDocumentComponent},
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
    SecteurComponent,
    StatutComponent,
    ProfilComponent,
    TypeDocumentComponent
  ],
  imports: [
    BrowserModule,HttpModule,RouterModule.forRoot(appRoutes),FormsModule,
    BrowserAnimationsModule, MatToolbarModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatPaginatorModule, MatIconModule, MatSelectModule
  ],
  providers: [ProjetService, UserService,DivisionService,SecteurService,StatutService,ProfilService,TypeDocService],
  bootstrap: [AppComponent]
})
export class AppModule { }
