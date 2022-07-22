import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AccessoireService {
  private baseUrl ='http://localhost:8080/api/auth/accessoires';

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Promise.reject(errMsg);
  }

  private extractData(res: HttpResponse<Object>) {
    let body;
    if (res) {
      body = res.body;
    }
    return body;
  }
  constructor(private http: HttpClient) { }

  //avor un accessoi celon son id
  getAccessoire(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  //delete one accessoire celon son id
  deleteAccessoire(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  //avoir la liste des accessoires
  getAccessoireList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  //update one accessoire
  updateAccessoire(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  //je dois créer l'accessoir dans le backend (deja fait)
  createAccessoire(accessoire: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, accessoire);
  }

  findAllAccessors() {
    return this.http.get(environment.baseUrl + '/auth/accessoires',
      {observe: 'response', responseType: 'json'}).toPromise()
      .then((res: HttpResponse<any>) => res.body)
      .catch(this.handleError);
  }
}
