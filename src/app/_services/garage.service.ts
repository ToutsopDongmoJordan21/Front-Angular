import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private baseUrl = 'http://localhost:8080/api/auth/garage';

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Promise.reject(errMsg);
  }

  constructor(private http: HttpClient) { }

  //avor un garage celon son id
  getGarage(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  //delete one garage celon son id
  deleteGarage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  //avoir la liste des garages
  getGarageList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  //update one garage
  updateGarage(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  //je dois créer garage dans le backend(deja fais)
  createGarage(garage: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, garage);
  }

  public postRequest(path: string, data: any) {
    return this.http.post(environment.baseUrl + path, data,
      {
        observe: 'response', responseType: 'json'}).toPromise()
        .then((res: HttpResponse<any>) => res.body)
        .catch(this.handleError);
  }
}

