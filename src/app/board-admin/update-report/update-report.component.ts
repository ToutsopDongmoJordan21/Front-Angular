import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/_services/entities/report';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.css']
})
export class UpdateReportComponent implements OnInit {

  id: number;
  report: Report;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService) { }

  ngOnInit() {
    this.report = new Report();

    this.id = this.route.snapshot.params['id'];

    this.reportService.getRepport(this.id)
    .subscribe(data => {
      console.log(data)
      this.report = data;
    }, error => console.log(error));
  }

  updateReport() {
    this.reportService.updateReport(this.id, this.report)
    .subscribe(data => {
      console.log(data);
      this.report = new Report();
      this.gotoList();
    }, error => console.log(error));
  }

  onSubmit() {
    this.updateReport();    
  }
  
  gotoList() {
    this.router.navigate(['/report']);
  }
  
  goback() {
    this.router.navigate(['/report']);
  }

}
