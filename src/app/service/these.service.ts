import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheseService {

  constructor(private http: HttpClient) {
  }
/*Ajouter*/
  these(data3,idequipe) {
    return this.http.post(environment.url + '/These/addthese/'+idequipe,data3);
}
/*Afficher*/
  getall() {
    return this.http.get(environment.url+'/These/allthese');
  }
/*Supprimer*/
  supprimerthese(id) {
    /*const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});*/
    return this.http.delete(environment.url+'/These/deletethese/' + id);
}
/*Modifier*/
  modifierthese(data4,id,idequipe) {
    /*const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});*/
    return this.http.put(environment.url +'/These/updatethese/' + id  +'/'+ idequipe,data4);
  }
}
