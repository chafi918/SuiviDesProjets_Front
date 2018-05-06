import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProjetsComponent } from './projets/projets.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ProjetService } from '../services/projets.service';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
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
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { NatureMarcheComponent } from './nature-marche/nature-marche.component';
import { NatureService } from '../services/nature.service';
import { MarcheService } from '../services/marche.service';
import { EntrepriseService } from '../services/entreprise.service';
import { ContactComponent } from './contact/contact.component';
import { DocumentComponent } from './document/document.component';
import { DocumentService } from '../services/document.service';
import { MarcheComponent } from './marche/marche.component';
import { ObservationComponent } from './observation/observation.component';
import { ObservationService } from '../services/observation.service';
import { DetailsProjetComponent } from './details-projet/details-projet.component';
import { DetailsMarcheComponent } from './details-marche/details-marche.component';


const appRoutes:Routes=[
  {path:'projets', component:ProjetsComponent},
  {path:'users', component:UserComponent},
  {path:'divisions', component:DivisionComponent},
  {path:'secteurs' , component:SecteurComponent},
  {path:'statuts', component:StatutComponent},
  {path:'profils',component:ProfilComponent},
  {path:'types',component:TypeDocumentComponent},
  {path:'natures',component:NatureMarcheComponent},
  {path:'entreprises',component:EntrepriseComponent},
  {path:'contacts',component:ContactComponent},
  {path:'documents',component:DocumentComponent},
  {path:'marches',component:MarcheComponent},
  {path:'observations',component:ObservationComponent},
  {path:'detailsProjet/:id',component:DetailsProjetComponent},
  {path:'detailsMarche/:id',component:DetailsMarcheComponent},
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
    TypeDocumentComponent,
    EntrepriseComponent,
    NatureMarcheComponent,
    ContactComponent,
    DocumentComponent,
    MarcheComponent,
    ObservationComponent,
    DetailsProjetComponent,
    DetailsMarcheComponent
  ],
  imports: [
    BrowserModule,HttpModule,RouterModule.forRoot(appRoutes),FormsModule,
    BrowserAnimationsModule, MatToolbarModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatPaginatorModule, MatIconModule, MatSelectModule, ReactiveFormsModule
  ],
  providers: [ProjetService, UserService,DivisionService,SecteurService,StatutService,ProfilService,TypeDocService,
    ContactService,NatureService,MarcheService,EntrepriseService, DocumentService,ObservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
