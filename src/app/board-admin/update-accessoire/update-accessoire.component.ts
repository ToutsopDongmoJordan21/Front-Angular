import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccessoireService } from 'src/app/_services/accessoire.service';
import { Accessoire } from 'src/app/_services/entities/accessoire';

@Component({
  selector: 'app-update-accessoire',
  templateUrl: './update-accessoire.component.html',
  styleUrls: ['./update-accessoire.component.css']
})
export class UpdateAccessoireComponent implements OnInit {

  id:number;
  accessoire: Accessoire;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private accessoireService: AccessoireService) { }

  ngOnInit() {
    this.SpinnerService.show();
    this.accessoire = new Accessoire();

    this.id = this.route.snapshot.params['id'];

    this.accessoireService.getAccessoire(this.id)
    .subscribe(data => {
      console.log(data)
      this.accessoire = data;
    }, error => console.log(error));   
    this.SpinnerService.hide();
  }

  updateAccessoire() {
    this.SpinnerService.show();
  this.accessoireService.updateAccessoire(this.id, this.accessoire)
    .subscribe(data => {
      console.log(data);
      this.accessoire = new Accessoire();
      this.gotoList();
    }, error => console.log(error));
    this.SpinnerService.hide();
  }

  onSubmit() {
    this.updateAccessoire();    
  }
  
  gotoList() {
    this.router.navigate(['/accessoire']);
  }
  
  goback() {
    this.router.navigate(['/accessoire']);
  }

}
