import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GarageService } from '../_services/garage.service';
import { Observable } from 'rxjs';
import { Garage } from '../_services/entities/garage';
import { Router } from '@angular/router';
import { PostCarDto } from '../_services/entities/PostCarDto';
import { CarsService } from '../_services/cars.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  isLoggedIn = false;
  garages: Observable<Garage[]>;
  carList: Observable<PostCarDto[]>;

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService,
              private carservice: CarsService,
              private SpinnerService: NgxSpinnerService,
              private garageService: GarageService,
              private router: Router,
              config: NgbCarouselConfig) {
                config.interval = 2000;  
                config.wrap = true;  
                config.keyboard = false;  
                config.pauseOnHover = false; 
               }

  ngOnInit() {
    this.SpinnerService.show();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.garages = this.garageService.getGarageList();
    this.carList = this.carservice.getCarList();

    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;

        // hide method
        this.SpinnerService.hide();
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  garageDetails(id: number) {
    // show spinner
    this.SpinnerService.show();
    this.router.navigate(['detailsGarage', id]);
    // hide method
    this.SpinnerService.hide();
  }

  carDetails(id: number) {
      // show spinner
      this.SpinnerService.show();
      this.router.navigate(['carDetails', id]);
      // hide method
      this.SpinnerService.hide();
  }

  pay(id: number) {
    this.SpinnerService.show();
    this.router.navigate(['payment', id]);
    this.SpinnerService.hide();
  }

  loan(id: number) {
    this.SpinnerService.show();
    this.router.navigate(['payments', id]);
    this.SpinnerService.hide();
  }

  rep() {
    this.SpinnerService.show();
    this.router.navigate(['createReport']);
    this.SpinnerService.hide();
  }
}
