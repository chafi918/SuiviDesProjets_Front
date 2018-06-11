import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProjetsComponent } from './projets/projets.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ProjetService } from '../services/projets.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { UserComponent } from './user/user.component';
import { UserService } from '../services/user.service';
import { DivisionComponent } from './division/division.component';
import { DivisionService } from '../services/division.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
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
import { LoggedVerif } from '../services/loggedVerif.service';
import { AdminControl } from '../services/adminControl.service';
import { ContactComponent } from './contact/contact.component';
import { DocumentComponent } from './document/document.component';
import { DocumentService } from '../services/document.service';
import { MarcheComponent } from './marche/marche.component';
import { ObservationComponent } from './observation/observation.component';
import { ObservationService } from '../services/observation.service';
import { DetailsProjetComponent } from './details-projet/details-projet.component';
import { DetailsMarcheComponent } from './details-marche/details-marche.component';
import { HttpClientModule } from '@angular/common/http';
import { ReferentielDocumentComponent } from './referentiel-document/referentiel-document.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ParametresComponent } from './parametres/parametres.component';
import { CommuneComponent } from './commune/commune.component';
import { CommuneService } from '../services/commune.service';
import { LoginAppComponent } from './login-app/login-app.component';
import { LoginService } from '../services/login.service';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { StatistiquesService } from '../services/statistiques.service';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ExportComponent } from './export/export.component';
import { ProvinceComponent } from './province/province.component';
import { ProvinceService } from '../services/province.service';

const appRoutes:Routes=[
  {path:'projets', component:ProjetsComponent, canActivate: [LoggedVerif]},
  {path:'users', component:UserComponent, canActivate: [LoggedVerif, AdminControl]},
  {path:'divisions', component:DivisionComponent, canActivate: [LoggedVerif, AdminControl]},
  {path:'secteurs' , component:SecteurComponent, canActivate: [LoggedVerif, AdminControl]},
  {path:'statuts', component:StatutComponent, canActivate: [LoggedVerif, AdminControl]},
  {path:'profils',component:ProfilComponent, canActivate: [LoggedVerif, AdminControl]},
  {path:'types',component:TypeDocumentComponent, canActivate: [LoggedVerif, AdminControl]},
  {path:'natures',component:NatureMarcheComponent, canActivate: [LoggedVerif, AdminControl]},
  {path:'entreprises',component:EntrepriseComponent, canActivate: [LoggedVerif]},
  {path:'contacts',component:ContactComponent, canActivate: [LoggedVerif]},
  {path:'documents',component:DocumentComponent, canActivate: [LoggedVerif]},
  {path:'marches',component:MarcheComponent, canActivate: [LoggedVerif]},
  {path:'observations',component:ObservationComponent, canActivate: [LoggedVerif]},
  {path:'detailsProjet/:id',component:DetailsProjetComponent, canActivate: [LoggedVerif]},
  {path:'detailsMarche/:id',component:DetailsMarcheComponent, canActivate: [LoggedVerif]},
  {path:'referentielDocument', component:ReferentielDocumentComponent, canActivate: [LoggedVerif]},
  {path:'parametres',component:ParametresComponent, canActivate: [LoggedVerif, AdminControl]},
  {path:'communes',component:CommuneComponent, canActivate: [LoggedVerif, AdminControl]},
  {path:'provinces',component:ProvinceComponent, canActivate: [LoggedVerif, AdminControl]},
  {path:'statistiques',component:StatistiquesComponent, canActivate: [LoggedVerif]},
  {path:'login',component:LoginAppComponent},
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
    DetailsMarcheComponent,
    ReferentielDocumentComponent,
    ParametresComponent,
    LoginAppComponent,
    CommuneComponent,
    StatistiquesComponent,
    ExportComponent,
    ProvinceComponent
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(appRoutes), FormsModule,
    BrowserAnimationsModule, MatToolbarModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatPaginatorModule, MatIconModule, MatSelectModule, ReactiveFormsModule, HttpClientModule, MatExpansionModule,
    PDFExportModule
  ],
  providers: [ProjetService, UserService, DivisionService, SecteurService, StatutService, ProfilService, TypeDocService,
    ContactService, NatureService, MarcheService, EntrepriseService, DocumentService, ObservationService, LoginService,
    LoggedVerif, AdminControl, CommuneService, StatistiquesService,ProvinceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
