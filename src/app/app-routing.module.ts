import { ArticleComponent } from './article/article.component';
import { StagaireComponent } from './stagaire/stagaire.component';
import { MembreComponent } from './membre/membre.component';
import { TheseComponent } from './these/these.component';
import { ContainerComponent } from './home/container/container.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import { EvenementComponent } from './evenement/evenement.component';
import { EquipeComponent } from './equipe/equipe.component';

const routes: Routes = [{path:'home',component:HomeComponent,children:
  [{path: '', component: ContainerComponent},
]
},
  {path: 'register', component: RegisterComponent},
  {path: 'these', component: TheseComponent},
  {path: 'membre', component: MembreComponent},
  {path: 'stagaire', component: StagaireComponent},
  {path: 'evenement', component: EvenementComponent},
  {path: 'equipe', component: EquipeComponent},
  {path: 'article', component: ArticleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
