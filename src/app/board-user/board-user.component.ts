import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  constructor(private userService: UserService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    //show spinner
    this.SpinnerService.show();
        //hide method
      this.SpinnerService.hide();
      
  }
}
