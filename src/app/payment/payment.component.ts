import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { CarsService } from '../_services/cars.service';
import { Car } from '../_services/entities/car';
import { PostCarDto } from '../_services/entities/PostCarDto';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public payuform: any = {};
  disablePaymentButton: boolean = true;
  currentUser: any;
  id: number;
  car: Car;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private token: TokenStorageService,
    private carservice: CarsService,
    private router: Router,
    private SpinnerService: NgxSpinnerService) { }

  confirmPayment() {
    
    const paymentPayload = {
      email: this.currentUser.email,
      name: this.currentUser.username,
      phone: this.currentUser.phoneNumber,
      productInfo: this.car.carTitle,
      amount: this.car.carPrice
    }
    return this.http.post<any>('http://localhost:8080/payment/payment-details', paymentPayload).subscribe(
      data => {
      this.SpinnerService.show();
      console.log(data);
      this.payuform.txnid = data.txnId;
      this.payuform.surl = data.sUrl;
      this.payuform.furl = data.fUrl;
      this.payuform.key = data.key;
      this.payuform.hash = data.hash;
      this.payuform.txnid = data.txnId;
        this.disablePaymentButton = false;
        this.SpinnerService.hide();
    }, error1 => {
        console.log(error1);
      })
      
  }
  ngOnInit() {
    this.SpinnerService.show();
    this.currentUser = this.token.getUser();
    this.car = new Car();
    this.id = this.route.snapshot.params['id'];
    this.carservice.getCars(this.id)
    .subscribe(data => {
      console.log(data)
      this.car = data;
    }, error => console.log(error));;
    this.SpinnerService.hide();
  }

  goback() {
    //show spinner
    this.SpinnerService.show();

    this.router.navigate(['home']);

    //hide method
    this.SpinnerService.hide();
  }
}

