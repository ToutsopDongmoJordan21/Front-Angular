import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { payment } from 'src/app/_services/entities/payment';
import { User } from 'src/app/_services/entities/user';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-profile-payment',
  templateUrl: './profile-payment.component.html',
  styleUrls: ['./profile-payment.component.css']
})
export class ProfilePaymentComponent implements OnInit {

  id: number;
  paymentList: Array<payment>;
  user: User;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.SpinnerService.show();
    this.id = this.route.snapshot.params['id'];
    this.paymentService.getPaymentByUser(this.id)
        .subscribe(data => {
          console.log(data)
          this.paymentList = data;
        }, error => console.log(error));
        this.SpinnerService.hide();
  }

  list() {
    this.SpinnerService.show();
    this.router.navigate(['profile']);
    this.SpinnerService.hide();
  }

}
