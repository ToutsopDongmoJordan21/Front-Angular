import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = 'http://localhost:8080/api/auth/subscription';

  private baseUrls = 'http://localhost:8080/api/auth/subscription/userSubscribe';

  constructor(private http: HttpClient) { }

  //avoir une subscription celon son id
  getSubsciption(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  //avoir la liste des ces subscriptions
  getSubscriptionByUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrls}/${id}`);
  }

  //delete une subscription
  deleteSubscription(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  //avoir la liste de tout les subscriptions
  getSubscriptionList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  //create subscription
  createSubscription(subscription: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, subscription);
  }

}
