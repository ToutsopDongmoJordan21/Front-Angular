import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AccessoireService } from 'src/app/_services/accessoire.service';
import { Accessoire } from 'src/app/_services/entities/accessoire';

@Component({
  selector: 'app-accessoire-list',
  templateUrl: './accessoire-list.component.html',
  styleUrls: ['./accessoire-list.component.css']
})
export class AccessoireListComponent implements OnInit {

  accessoire: Observable<Accessoire[]>;

  constructor(private accessoireService: AccessoireService,
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
    this.accessoire = this.accessoireService.getAccessoireList();
  }

  deleteAccessoire(id: number) {
    this.SpinnerService.show();

    this.accessoireService.deleteAccessoire(id)
       .subscribe(
         data => {
           alert('vous venez de supprimer un accessoire');
           console.log(data);
           this.reloadData();
         }, error => console.log(error)
       );
       this.SpinnerService.hide();
  }

  accessoireDetails(id: number) {
    this.SpinnerService.show();
    this.router.navigate(['detailsAccessoire', id]);
    this.SpinnerService.hide();
  }

  updateAccessoire(id: number) {
    this.SpinnerService.show();
    this.router.navigate(['updateAccessoire', id]);
    this.SpinnerService.hide();
  }

  createAccessoire() {
    this.router.navigate(['createAccessoire']);
  }

}
