import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FichierService {

  private baseUrl = 'http://localhost:8080/api/auth/fichiers';

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Promise.reject(errMsg);
  }

  constructor(private http: HttpClient) { }

  getFichier(id: number):Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteFichier(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text' });
  }

  getFichierList(id: number, value: any): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createFichier(fichiers: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, fichiers);
  }

  public postRequest(path: string, data: any) {
    return this.http.post(environment.baseUrl + path, data,
      {observe: 'response', responseType: 'json'}).toPromise()
      .then((res: HttpResponse<any>) => res.body)
      .catch(this.handleError);
  }

}
