import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/payment/payment';

  private baseUrls = 'http://localhost:8080/payment/payment/payment';

  constructor(private http: HttpClient) { }

  //avoir un payment celon son id
  getPayment(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  //avoir la liste des ces payment
  getPaymentByUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrls}/${id}`);
  }

  //delete un payment
  deletepayment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  //avoir la liste de tout les payment
  getPaymentList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
