import {environment} from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  constructor(private http: HttpClient) {}

  getallforum() {
    return this.http.get(environment.url +'/Forum/allforum');
  }
}
