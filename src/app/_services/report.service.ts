import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl ='http://localhost:8080/api/auth/report';

  private baseUrls = 'http://localhost:8080/api/auth/report/userReport';

  constructor(private http: HttpClient) { }

  //avoir un report celon son id
  getRepport(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  //delete un report celon son id
  deleteReport(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  //avoir la liste des reports
  getReportList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  //update one report
  updateReport(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  //create one report for the user
  createReport(report: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, report);
  }

  //avoir les reports d'un seul utilisateur
  getReportByUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrls}/${id}`);
  }
}
