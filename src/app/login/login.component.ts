import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  currentProfileImage = 'assets/images/img.png';
  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    if (this.tokenStorage.getUserImage()) {
      this.currentProfileImage = this.tokenStorage.getUserImage();
    }
  }

  onSubmit() {
    // show spinner
    this.spinnerService.show();

    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUserImage(data.url);
        this.tokenStorage.saveUser(data);
        this.currentProfileImage = data.url;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;

        // hide method
        this.spinnerService.hide();
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  change() {
    this.router.navigate(['register']);
  }

}
