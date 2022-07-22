import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { PostCarDto } from '../_services/entities/PostCarDto';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  currentImage: any;
  images: [];

  constructor(private token: TokenStorageService,
    private router: Router,
    config: NgbCarouselConfig) {
      config.interval = 2000;  
      config.wrap = true;  
      config.keyboard = false;  
      config.pauseOnHover = false;
     }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.currentImage = this.token.getUserImage();
  }

  updateUser(id: number) {
    this.router.navigate(['update', this.currentUser.id]);
  }

  updateCars(id: number) {
    this.router.navigate(['detailsUserCars', this.currentUser.id]);
  }

  profileSubscription(id: number) {
    this.router.navigate(['profileSubscription', this.currentUser.id])
  }

  profilePayment(id: number) {
    this.router.navigate(['profilePayment', this.currentUser.id])
  }

  profileReport(id: number) {
    this.router.navigate(['profileReport', this.currentUser.id])
  }
}
