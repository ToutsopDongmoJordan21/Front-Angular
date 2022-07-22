import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidateEqualModule } from 'ng-validate-equal';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { UserListComponent } from './board-user/user-list/user-list.component';
import { UserDetailsComponent } from './board-user/user-details/user-details.component';
import { UpdateUserComponent } from './profile/update-user/update-user.component';
import { BoardCarComponent } from './board-car/board-car.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { GarageListComponent } from './board-admin/garage-list/garage-list.component';
import { GarageDetailsComponent } from './board-admin/garage-details/garage-details.component';
import { UpdateGarageComponent } from './board-admin/update-garage/update-garage.component';
import { CreateGarageComponent } from './board-admin/create-garage/create-garage.component';
import { CreateReportComponent } from './board-admin/create-report/create-report.component';
import { ReportDetailsComponent } from './board-admin/report-details/report-details.component';
import { ReportListComponent } from './board-admin/report-list/report-list.component';
import { UpdateReportComponent } from './board-admin/update-report/update-report.component';
import {FileServiceService} from "./_services/file-service.service";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { CarsDetailsComponent } from './board-admin/cars-details/cars-details.component';
import { CarsListComponent } from './board-admin/cars-list/cars-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileCarComponent } from './profile/profile-car/profile-car.component';
import { CarDetailsComponent } from './home/car-details/car-details.component';
import { UpdateCarComponent } from './profile/update-car/update-car.component';
import { BoardSubscriptionComponent } from './board-subscription/board-subscription.component';
import { SubscriptionListComponent } from './board-admin/subscription-list/subscription-list.component';
import { SubscriptionDetailsComponent } from './board-admin/subscription-details/subscription-details.component';
import { ProfileSubscriptionComponent } from './profile/profile-subscription/profile-subscription.component';
import { AccessoireListComponent } from './board-admin/accessoire-list/accessoire-list.component';
import { UpdateAccessoireComponent } from './board-admin/update-accessoire/update-accessoire.component';
import { CreateAccessoireComponent } from './board-admin/create-accessoire/create-accessoire.component';
import { AccessoireDetailsComponent } from './board-admin/accessoire-details/accessoire-details.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentListComponent } from './board-admin/payment-list/payment-list.component';
import { PaymentDetailsComponent } from './board-admin/payment-details/payment-details.component';
import { ProfilePaymentComponent } from './profile/profile-payment/profile-payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileReportComponent } from './profile/profile-report/profile-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,
    ProfileComponent,
    FooterComponent,
    UserListComponent,
    UserDetailsComponent,
    UpdateUserComponent,
    BoardCarComponent,
    UploadFilesComponent,
    GarageListComponent,
    GarageDetailsComponent,
    UpdateGarageComponent,
    CreateGarageComponent,
    CreateReportComponent,
    ReportDetailsComponent,
    ReportListComponent,
    UpdateReportComponent,
    CarsDetailsComponent,
    CarsListComponent,
    UpdateCarComponent,
    ProfileCarComponent,
    CarDetailsComponent,
    BoardSubscriptionComponent,
    SubscriptionListComponent,
    SubscriptionDetailsComponent,
    ProfileSubscriptionComponent,
    AccessoireListComponent,
    UpdateAccessoireComponent,
    CreateAccessoireComponent,
    AccessoireDetailsComponent,
    PaymentComponent,
    PaymentListComponent,
    PaymentDetailsComponent,
    ProfilePaymentComponent,
    PaymentsComponent,
    ProfileReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ValidateEqualModule,
    ShowHidePasswordModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [authInterceptorProviders,
    FileServiceService,
    NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
