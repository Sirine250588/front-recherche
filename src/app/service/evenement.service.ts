import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(private http: HttpClient) {
  }

/*Ajouter*/
evenement(data3,idutilisateur) {
    return this.http.post(environment.url + '/Evenement/addevenement/'+idutilisateur,data3);
}
/*Afficher*/
getallevenement() {
    return this.http.get(environment.url+'/Evenement/allevenements');
  }
/*Supprimer*/
supprimerevenement(id) {
    /*const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});*/
    return this.http.delete(environment.url+'/Evenement/deleteevenement/' + id);
}
/*Modifier*/
modifierevenement(data4,id,idutilisateur) {
    /*const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});*/
    return this.http.put(environment.url +'/Evenement/updateevenemnt/' + id  +'/'+ idutilisateur,data4);
  }
}
