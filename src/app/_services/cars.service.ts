import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private baseUrl = 'http://localhost:8080/api/auth/cars';

  private baseUrls = 'http://localhost:8080/api/auth/cars/userCreated';

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

  //avoir une voiture selon son id
  getCars(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // avoir la liste de ces cars
  getCreatedCras(id: number): Observable<any> {
    return this.http.get(`${this.baseUrls}/${id}`);
  }

  //delete one car depending of its id
  deleteCars(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  //AVoir la liste des cars
  getCarList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  //update car info
  updateCars(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  //creattion des cars par l'utilisateur aprés les souscriptions
  createCars() {
    console.log('not yet implemented');
  }

  public postRequest(path: string, data: any) {
    return this.http.post(environment.baseUrl + path, data,
      {observe: 'response', responseType: 'json'}).toPromise()
      .then((res: HttpResponse<any>) => res.body)
      .catch(this.handleError);
  }
}
