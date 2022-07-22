import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/_services/entities/car';
import { CarsService } from 'src/app/_services/cars.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {

  car: Observable<Car[]>;

  constructor(private carService: CarsService,
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
    this.car = this.carService.getCarList();
  }

  deleteCar(id: number) {
    this.SpinnerService.show();

    this.carService.deleteCars(id)
       .subscribe(
         data => {
           alert('vous venez de supprimer ce car!!!' );
           console.log(data);
           this.reloadData();
         },
         error => console.log(error)
       );
       this.SpinnerService.hide();
  }

  detailsCar(id: number) {
    this.SpinnerService.show();
    this.router.navigate(['detailsCars', id]);
    this.SpinnerService.hide();
  }

  /*updateCar(id: number) {
    this.SpinnerService.show();
    this.router.navigate(['updateCar', id]);
    this.SpinnerService.hide();
  } */

}
