import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  constructor(private http: HttpClient) {
  }

/*Ajouter Membre*/
membre(data3,idthese,idequipe) {
  return this.http.post(environment.url + '/Membre/addmembre/'+idthese+'/'+idequipe,data3);
}
/*Afficher Membre*/
getallmembre() {
  return this.http.get(environment.url+'/Membre/allmembre');
}
/*Supprimer Membre*/
supprimermembre(id) {
  /*const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});*/
  return this.http.delete(environment.url+'/Membre/deletemembre/' + id);
}
/*Modifier Membre*/
modifiermembre(data4,id,idthese,idequipe) {
  /*const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});*/
  return this.http.put(environment.url +'/Membre/updatemembre/' +id+'/'+idthese+'/'+idequipe,data4);
}


}
