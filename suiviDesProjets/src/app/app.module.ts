import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProjetsComponent } from './projets/projets.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ProjetService } from '../services/projets.service';
import { FormsModule } from '@angular/forms';

const appRoutes:Routes=[
  {path:'projets', component:ProjetsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProjetsComponent
  ],
  imports: [
    BrowserModule,HttpModule,RouterModule.forRoot(appRoutes),FormsModule
  ],
  providers: [ProjetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
