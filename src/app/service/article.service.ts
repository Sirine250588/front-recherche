import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

/*Ajouter*/
  article(data3,idutilisateur) {
    return this.http.post(environment.url + '/Article/addarticle/'+idutilisateur,data3);
}
/*Afficher*/
  getallarticle() {
    return this.http.get(environment.url+'/Article/allarticle');
  }
/*Supprimer*/
  supprimerarticle(id) {
    /*const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});*/
    return this.http.delete(environment.url+'/Article/deletearticle/' + id);
}
/*Modifier*/
  modifierarticle(data4,id,idutilisateur) {
    /*const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});*/
    return this.http.put(environment.url +'/Article/updatearticle/' + id  +'/'+ idutilisateur,data4);
  }

  valider(id){
    return this.http.get(environment.url+'/Article/valider/' + id);
  }
}
