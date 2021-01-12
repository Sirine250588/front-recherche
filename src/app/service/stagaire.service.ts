import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StagaireService {

  constructor(private http: HttpClient) {
  }

  /*Ajouter Stagaire*/
stagaire(data3,idthese) {
  return this.http.post(environment.url + '/Stagaire/addstagaire/'+idthese,data3);
}
/*Afficher Stagaire*/
getallstagaire() {
  return this.http.get(environment.url+'/Stagaire/allstagaire');
}
/*Supprimer Stagaire*/
supprimerstagaire(id) {
  /*const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});*/
  return this.http.delete(environment.url+'/Stagaire/deletestagaire/' + id);
}
/*Modifier Stagaire*/
modifierstagaire(data4,id,idthese) {
  /*const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});*/
  return this.http.put(environment.url +'/Stagaire/updatestagaire/' +id+'/'+idthese,data4);
}
}
