import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/_services/report.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Report } from 'src/app/_services/entities/report';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  report: Observable<Report[]>;

  constructor(private reportService: ReportService,
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
    this.report = this.reportService.getReportList();
  }

  deleteReport(id: number) {
    //show spinner
    this.SpinnerService.show();

    this.reportService.deleteReport(id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error)
    );

    //hide method
    this.SpinnerService.hide();
  }

  reportDetails(id: number) {
    //show spinner
    this.SpinnerService.show();
    this.router.navigate(['detailsReport', id]);
    //hide methos
    this.SpinnerService.hide();
  }

  updateReport(id: number) {
    //show spinner
    this.SpinnerService.show();
    this.router.navigate(['updateReport', id]);
    //hide method
    this.SpinnerService.hide();
  }

}
