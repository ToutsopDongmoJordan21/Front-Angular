import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccessoireService } from 'src/app/_services/accessoire.service';
import { Accessoire } from 'src/app/_services/entities/accessoire';

@Component({
  selector: 'app-create-accessoire',
  templateUrl: './create-accessoire.component.html',
  styleUrls: ['./create-accessoire.component.css']
})
export class CreateAccessoireComponent implements OnInit {

  accessoire: Accessoire = new Accessoire();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private accessoireService: AccessoireService) { }

  ngOnInit() {
  }

  newAccessoire(): void {
    //show spinner
    this.SpinnerService.show();

    this.accessoire = new Accessoire();

    //hide method
    this.SpinnerService.hide();
  }

  save() {
    //show spinner
    this.SpinnerService.show();

    this.accessoireService
    .createAccessoire(this.accessoire).subscribe(data => {
      console.log(data)
      this.accessoire = new Accessoire();
      this.router.navigate(['/accessoire']);
    }, 
    error => console.log(error));
    //hide method
    this.SpinnerService.hide();
    alert('successful added garage');
  }

  onSubmit() {
    //show spinner
    this.SpinnerService.show();
    this.save();    
    //hide method
    this.SpinnerService.hide();
  }

  list() {
    //show spinner
    this.SpinnerService.show();

    this.router.navigate(['/accessoire']);

    //hide method
    this.SpinnerService.hide();
  }


}
