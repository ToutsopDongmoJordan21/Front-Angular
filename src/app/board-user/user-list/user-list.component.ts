import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_services/entities/user';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private userService: UserService,
    private router: Router,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    //show spinner
    this.SpinnerService.show();

    this.reloadData();

     //hide method
     this.SpinnerService.hide();
  }

  reloadData() {
    this.users = this.userService.getUserList();
  }

  deleteUser(id: number) {
    //show spinner
    this.SpinnerService.show();

    this.userService.deleteUser(id)
    .subscribe(
     data => {
      console.log(data);
      this.reloadData();
    },
    error => console.log(error));
     //hide method
     this.SpinnerService.hide();
  }

  userDetails(id: number) {
    //show spinner
    this.SpinnerService.show();
    this.router.navigate(['details', id]);
     //hide method
     this.SpinnerService.hide();
  }
}
