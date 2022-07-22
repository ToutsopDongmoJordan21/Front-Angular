import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'src/app/_services/entities/subscription';
import { User } from 'src/app/_services/entities/user';
import { SubscriptionService } from 'src/app/_services/subscription.service';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.css']
})
export class SubscriptionDetailsComponent implements OnInit {

  id: number;
  subscription: Subscription;
  user: User;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private subscriptionService: SubscriptionService,
              private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.SpinnerService.show();
    this.subscription = new Subscription();
    this.id = this.route.snapshot.params['id'];
    this.subscriptionService.getSubsciption(this.id)
       .subscribe(data => {
         console.log(data)
         this.subscription = data;
       }, error => console.log(error));
       this.SpinnerService.hide();
  }

  list() {
    this.SpinnerService.show();
    this.router.navigate(['subscription']);
    this.SpinnerService.hide();
  }

}
