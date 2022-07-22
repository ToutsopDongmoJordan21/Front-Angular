import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { payment } from 'src/app/_services/entities/payment';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  payment: Observable<payment[]>;

  constructor(private paymentService: PaymentService,
    private SpinnerService: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
     //show spinner
     this.SpinnerService.show();

     this.reloadData();
 
     //hide method
     this.SpinnerService.hide();
  }

  reloadData() {
    this.payment = this.paymentService.getPaymentList();
  }

  deletePayment(id: number) {
    this.SpinnerService.show();
    this.paymentService.deletepayment(id)
       .subscribe(
         data => {
           alert('vous venez de supprimer ce payment!!!');
           console.log(data);
           this.reloadData();
         },
         error => console.log(error));
         this.SpinnerService.hide();
  }

  detailsPayment(id: number) {
    this.SpinnerService.show();
    this.router.navigate(['detailsPayment', id]);
    this.SpinnerService.hide();
  }


}
