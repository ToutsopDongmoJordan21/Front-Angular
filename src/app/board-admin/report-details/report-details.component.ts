import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/_services/entities/report';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/_services/report.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit {

  id: number;
  report: Report;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
     //show spinner
     this.SpinnerService.show();

     this.report = new  Report();
 
     this.id = this.route.snapshot.params['id'];
 
     this.reportService.getRepport(this.id)
     .subscribe(data => {
       console.log(data)
       this.report = data;
     }, error => console.log(error));
     //hide method
     this.SpinnerService.hide();
  }

  list() {
    //show spinner
    this.SpinnerService.show();

    this.router.navigate(['report']);

    //hide method
    this.SpinnerService.hide();
  }

}
