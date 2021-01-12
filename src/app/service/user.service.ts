import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwt: string;
  username: string;
  roles;

  constructor(private http: HttpClient) {
  }

  login(data) {
    return this.http.post(environment.url + '/login'
      , data, {observe: 'response'});
  }

  register(data2,idthese) {
    return this.http.post(environment.url + '/Stagaire/addstagaire/'+idthese,data2);
  }

  parseJWT() {
    const jwtHelper = new JwtHelperService();
    const objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.obj;
    this.roles = objJWT.roles;
    localStorage.setItem('role', this.roles);
  }

  saveToken(jwt: string) {
    sessionStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  loadToken() {
    this.jwt = sessionStorage.getItem('token');
    this.parseJWT();
  }

  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }
}
