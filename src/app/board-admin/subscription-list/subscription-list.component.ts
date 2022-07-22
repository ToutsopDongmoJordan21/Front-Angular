import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Subscription } from 'src/app/_services/entities/subscription';
import { SubscriptionService } from 'src/app/_services/subscription.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  subscription: Observable<Subscription[]>;

  constructor(private subscriptionService: SubscriptionService,
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
    this.subscription = this.subscriptionService.getSubscriptionList();
  }

  deleteSubscription(id: number) {
    this.SpinnerService.show();
    this.subscriptionService.deleteSubscription(id)
       .subscribe(
         data => {
           alert('vous venez de supprimer cette subscription!!!');
           console.log(data);
           this.reloadData();
         },
         error => console.log(error));
         this.SpinnerService.hide();
  }

  detailsSubscription(id: number) {
    this.SpinnerService.show();
    this.router.navigate(['detailsSubscription', id]);
    this.SpinnerService.hide();
  }

}
