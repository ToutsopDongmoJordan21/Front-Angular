import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'src/app/_services/entities/subscription';
import { User } from 'src/app/_services/entities/user';
import { SubscriptionService } from 'src/app/_services/subscription.service';


@Component({
  selector: 'app-profile-subscription',
  templateUrl: './profile-subscription.component.html',
  styleUrls: ['./profile-subscription.component.css']
})
export class ProfileSubscriptionComponent implements OnInit {

  id: number;
  subscriptionList: Array<Subscription>;
  user: User;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.SpinnerService.show();
    this.id = this.route.snapshot.params['id'];
    this.subscriptionService.getSubscriptionByUser(this.id)
        .subscribe(data => {
          console.log(data)
          this.subscriptionList = data;
        }, error => console.log(error));
        this.SpinnerService.hide();
  }

  list() {
    this.SpinnerService.show();
    this.router.navigate(['profile']);
    this.SpinnerService.hide();
  }

}
