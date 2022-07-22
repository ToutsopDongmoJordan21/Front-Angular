import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_services/entities/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  
  id: number;
  user: User;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {

    //show spinner
    this.SpinnerService.show();

    this.user = new User();

    this.id = this.route.snapshot.params['id'];

    this.userService.getUser(this.id)
    .subscribe(data => {
      console.log(data)
      this.user = data;
    }, error => console.log(error));
    //hide method
    this.SpinnerService.hide();
  }

  list() {
    //show spinner
    this.SpinnerService.show();

    this.router.navigate(['users']);

    //hide method
    this.SpinnerService.hide();
  }

}
