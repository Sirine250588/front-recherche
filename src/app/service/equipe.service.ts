import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private http: HttpClient) {

  }
//** Afficher */
   getallequipe() {
    return this.http.get(environment.url + '/Equipe/allequipe');
  }

//** Ajouter */
   equipe(data3){
    return this.http.post(environment.url + '/Equipe/addequipe',data3);
  }

  /*Supprimer*/
  supprimerequipe(id){
    return this.http.delete(environment.url+'/Equipe/deletequipe/' + id);
  }

  /*Modifier*/
  modifierequipe(data4,id) {
    /*const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});*/
    return this.http.put(environment.url +'/Equipe/updateequipe/' + id,data4);
  }

}
