import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { CarsService } from 'src/app/_services/cars.service';
import { Car } from 'src/app/_services/entities/car';
import { PostCarDto } from 'src/app/_services/entities/PostCarDto';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  id: number;
  car: Car;
  images: [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private carService: CarsService,
    private SpinnerService: NgxSpinnerService,
    config: NgbCarouselConfig) { 
      config.interval = 2000;  
      config.wrap = true;  
      config.keyboard = false;  
      config.pauseOnHover = false; }

  ngOnInit() {
    this.SpinnerService.show();
    this.car = new Car();

    this.id = this.route.snapshot.params['id'];

    this.carService.getCars(this.id)
       .subscribe(data => {
         console.log(data)
         this.car = data;
       }, error => console.log(error));
       this.SpinnerService.hide();
  }

  list() {
    this.SpinnerService.show();
    this.router.navigate(['home']);
    this.SpinnerService.hide();
  }

}
