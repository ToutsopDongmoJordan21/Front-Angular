import { Component, OnInit } from '@angular/core';
import { GarageService } from 'src/app/_services/garage.service';
import { Garage } from 'src/app/_services/entities/garage';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-garage-details',
  templateUrl: './garage-details.component.html',
  styleUrls: ['./garage-details.component.css']
})
export class GarageDetailsComponent implements OnInit {

  id: number;
  garage: Garage;
  images: [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private garageService: GarageService,
    private SpinnerService: NgxSpinnerService,
    config: NgbCarouselConfig) { 
      config.interval = 2000;  
      config.wrap = true;  
      config.keyboard = false;  
      config.pauseOnHover = false; }

  ngOnInit() {
     //show spinner
     this.SpinnerService.show();

     this.garage = new Garage();
 
     this.id = this.route.snapshot.params['id'];
 
     this.garageService.getGarage(this.id)
     .subscribe(data => {
       console.log(data)
       this.garage = data;
     }, error => console.log(error));
     //hide method
     this.SpinnerService.hide();
  }


  list() {
    //show spinner
    this.SpinnerService.show();

    this.router.navigate(['garage']);

    //hide method
    this.SpinnerService.hide();
  }

}
