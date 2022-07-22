import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Report } from 'src/app/_services/entities/report';
import { User } from 'src/app/_services/entities/user';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-profile-report',
  templateUrl: './profile-report.component.html',
  styleUrls: ['./profile-report.component.css']
})
export class ProfileReportComponent implements OnInit {

  id: number;
  reportList: Array<Report>;
  user: User;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.SpinnerService.show();
    this.id = this.route.snapshot.params['id'];
    this.reportService.getReportByUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.reportList = data;
      }, error => console.log(error));
      this.SpinnerService.hide();
  }

  list() {
    this.SpinnerService.show();
    this.router.navigate(['profile']);
    this.SpinnerService.hide();
  }

}
