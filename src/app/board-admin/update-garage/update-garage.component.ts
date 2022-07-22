import { Component, OnInit } from '@angular/core';
import { Garage } from 'src/app/_services/entities/garage';
import { GarageService } from 'src/app/_services/garage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-garage',
  templateUrl: './update-garage.component.html',
  styleUrls: ['./update-garage.component.css']
})
export class UpdateGarageComponent implements OnInit {

  id: number;
  garage: Garage;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private garageService: GarageService) { }

  ngOnInit() {
    this.SpinnerService.show();
    this.garage = new Garage();

    this.id = this.route.snapshot.params['id'];

    this.garageService.getGarage(this.id)
    .subscribe(data => {
      console.log(data)
      this.garage = data;
    }, error => console.log(error));   
    this.SpinnerService.hide();
}

updateGarage() {
  this.SpinnerService.show();
  this.garageService.updateGarage(this.id, this.garage)
    .subscribe(data => {
      console.log(data);
      this.garage = new Garage();
      this.gotoList();
    }, error => console.log(error));
    this.SpinnerService.hide();
}

onSubmit() {
  this.updateGarage();    
}

gotoList() {
  this.router.navigate(['/garage']);
}

goback() {
  this.router.navigate(['/garage']);
}

}
