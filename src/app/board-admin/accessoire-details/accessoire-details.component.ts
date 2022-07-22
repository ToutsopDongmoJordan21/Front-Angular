import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccessoireService } from 'src/app/_services/accessoire.service';
import { Accessoire } from 'src/app/_services/entities/accessoire';

@Component({
  selector: 'app-accessoire-details',
  templateUrl: './accessoire-details.component.html',
  styleUrls: ['./accessoire-details.component.css']
})
export class AccessoireDetailsComponent implements OnInit {

  id: number;
  accessoire: Accessoire;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accessoireService: AccessoireService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
     //show spinner
     this.SpinnerService.show();

     this.accessoire = new Accessoire();
 
     this.id = this.route.snapshot.params['id'];
 
     this.accessoireService.getAccessoire(this.id)
     .subscribe(data => {
       console.log(data)
       this.accessoire = data;
     }, error => console.log(error));
     //hide method
     this.SpinnerService.hide();
  }

  list() {
    //show spinner
    this.SpinnerService.show();

    this.router.navigate(['accessoire']);

    //hide method
    this.SpinnerService.hide();
  }

}
