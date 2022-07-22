import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Garage } from 'src/app/_services/entities/garage';
import { Router } from '@angular/router';
import { GarageService } from 'src/app/_services/garage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.css']
})
export class GarageListComponent implements OnInit {

  garage: Observable<Garage[]>;

  constructor(private garageService: GarageService,
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
    this.garage = this.garageService.getGarageList();
  }

  deleteGarage(id: number) {
    //show spinner
    this.SpinnerService.show();

    this.garageService.deleteGarage(id)
       .subscribe(
         data => {
           alert('vous venez de supprimer ce garage');
           console.log(data);
           this.reloadData();
         },
         error => console.log(error)
       );
       //hide method
     this.SpinnerService.hide();
  }

  garageDetails(id: number) {
    //show spinner
    this.SpinnerService.show();
    this.router.navigate(['detailsGarage', id]);
    //hide method
    this.SpinnerService.hide();
  }

  updateGarage(id: number) {
    //show spinner
    this.SpinnerService.show();
    this.router.navigate(['updateGarage', id]);
    //hide method
    this.SpinnerService.hide();
  }

  createGarage() {
    this.router.navigate(['createGarage']);
  }

}
