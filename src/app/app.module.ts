import { MembreComponent } from './membre/membre.component';
import { PublicationComponent } from './publication/publication.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { TheseComponent } from './these/these.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './home/footer/footer.component';
import { ContainerComponent } from './home/container/container.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { EquipeComponent } from './equipe/equipe.component';
import { ForumComponent } from './forum/forum.component';
import { StagaireComponent } from './stagaire/stagaire.component';
import { EvenementComponent } from './evenement/evenement.component';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MembreComponent ,
    PublicationComponent,
    NavbarComponent,
    RegisterComponent,
    FooterComponent,
    TheseComponent,
    ContainerComponent,
    EquipeComponent,
    ForumComponent,
    StagaireComponent,
    EvenementComponent,
    AdministrateurComponent,
    ArticleComponent,

  ],
  imports: [
    /*ModalModule.forRoot(),*/
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
