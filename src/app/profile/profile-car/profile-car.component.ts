import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/_services/entities/car';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from 'src/app/_services/cars.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostCarDto } from 'src/app/_services/entities/PostCarDto';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  id: number;
  carList: Array<PostCarDto>;
  images: [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private carService: CarsService,
    private SpinnerService: NgxSpinnerService,
    config: NgbCarouselConfig) { 
      config.interval = 2000;  
      config.wrap = true;  
      config.keyboard = false;  
      config.pauseOnHover = false; 
     }

  ngOnInit() {
    this.SpinnerService.show();

    this.id = this.route.snapshot.params['id'];

    this.carService.getCreatedCras(this.id)
       .subscribe(data => {
        console.log(data)
        this.carList = data;
      }, error => console.log(error));
      this.SpinnerService.hide();
  }

  list() {
    this.SpinnerService.show();
    this.router.navigate(['profile']);
    this.SpinnerService.hide();
  }

  updateCar(id: number) {
    //show spinner
    this.SpinnerService.show();
    this.router.navigate(['updateCar', id]);
    //hide method
    this.SpinnerService.hide();
  }

  createReport(id: number) {
    //show spinner
    this.SpinnerService.show();
    this.router.navigate(['createReport', id]);
    //hide method
    this.SpinnerService.hide();
  }

}
