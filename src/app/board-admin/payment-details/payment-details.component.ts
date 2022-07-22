import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { payment } from 'src/app/_services/entities/payment';
import { User } from 'src/app/_services/entities/user';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  id: number;
  payment: payment;
  user: User;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    
    this.SpinnerService.show();
    this.payment = new payment();
    this.id = this.route.snapshot.params['id'];
    this.paymentService.getPayment(this.id)
       .subscribe(data => {
         console.log(data)
         this.payment = data;
       }, error => console.log(error));
       this.SpinnerService.hide();
  }

  list() {
    this.SpinnerService.show();
    this.router.navigate(['payments']);
    this.SpinnerService.hide();
  }

}
