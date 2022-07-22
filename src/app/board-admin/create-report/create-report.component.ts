import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/_services/entities/report';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/_services/report.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Car } from 'src/app/_services/entities/car';
import { CarsService } from 'src/app/_services/cars.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {

  id: number;
  report: Report = new Report();
  submitted = false;
  car: Car;
  currentUser: any;

  constructor(private route: ActivatedRoute, 
    private token: TokenStorageService,
    private router: Router,
    private reportService: ReportService,
    private carservice: CarsService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.SpinnerService.show();
    this.currentUser = this.token.getUser();
    this.car = new Car();
    this.id = this.route.snapshot.params['id'];
    this.carservice.getCars(this.id)
    .subscribe(data => {
      this.car = data;
    }, error => console.log(error));
    this.SpinnerService.hide();
  }

  newReport(): void {
    //show spinner
    this.SpinnerService.show();

    this.submitted = false;
    this.report = new Report();

    //hide method
    this.SpinnerService.hide();
  }

  save() {
    const reportdto = {
      reportName: this.car.carTitle,
      reportContenue: this.report.reportContenue
    }
    //show spinner
    this.SpinnerService.show();

    this.reportService.createReport(reportdto).subscribe(data => {
      console.log(data)
    this.router.navigate(['profileReport', this.currentUser.id])
      alert('successful added report!!');
    }, 
    error => console.log(error));

    //hide method
    this.SpinnerService.hide();
  }

  onSubmit() {
    //show spinner
    this.SpinnerService.show();

    this.submitted = true;
    this.save();    

    //hide method
    this.SpinnerService.hide();
  }

  gotoList() {
    //show spinner
    this.SpinnerService.show();

    this.router.navigate(['/report']);

    //hide method
    this.SpinnerService.hide();
  }

  list(id: number) {
    this.router.navigate(['detailsUserCars', this.currentUser.id])
  }

}
