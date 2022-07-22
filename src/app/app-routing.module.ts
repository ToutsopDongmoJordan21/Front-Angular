import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { UserDetailsComponent } from './board-user/user-details/user-details.component';
import { UserListComponent } from './board-user/user-list/user-list.component';
import { UpdateUserComponent } from './profile/update-user/update-user.component';
import { BoardCarComponent } from './board-car/board-car.component';
import { GarageListComponent } from './board-admin/garage-list/garage-list.component';
import { GarageDetailsComponent } from './board-admin/garage-details/garage-details.component';
import { UpdateGarageComponent } from './board-admin/update-garage/update-garage.component';
import { CreateGarageComponent } from './board-admin/create-garage/create-garage.component';
import { ReportListComponent } from './board-admin/report-list/report-list.component';
import { CreateReportComponent } from './board-admin/create-report/create-report.component';
import { UpdateReportComponent } from './board-admin/update-report/update-report.component';
import { ReportDetailsComponent } from './board-admin/report-details/report-details.component';
import { CarsListComponent } from './board-admin/cars-list/cars-list.component';
import { CarsDetailsComponent } from './board-admin/cars-details/cars-details.component';
import { ProfileCarComponent } from './profile/profile-car/profile-car.component';
import { CarDetailsComponent } from './home/car-details/car-details.component';
import { UpdateCarComponent } from './profile/update-car/update-car.component';
import { SubscriptionDetailsComponent } from './board-admin/subscription-details/subscription-details.component';
import { SubscriptionListComponent } from './board-admin/subscription-list/subscription-list.component';
import { ProfileSubscriptionComponent } from './profile/profile-subscription/profile-subscription.component';
import { AccessoireDetailsComponent } from './board-admin/accessoire-details/accessoire-details.component';
import { UpdateAccessoireComponent } from './board-admin/update-accessoire/update-accessoire.component';
import { CreateAccessoireComponent } from './board-admin/create-accessoire/create-accessoire.component';
import { AccessoireListComponent } from './board-admin/accessoire-list/accessoire-list.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentListComponent } from './board-admin/payment-list/payment-list.component';
import { PaymentDetailsComponent } from './board-admin/payment-details/payment-details.component';
import { ProfilePaymentComponent } from './profile/profile-payment/profile-payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileReportComponent } from './profile/profile-report/profile-report.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'car', component: BoardCarComponent },
  { path: 'users', component: UserListComponent },
  { path: 'garage', component: GarageListComponent },
  { path: 'report', component: ReportListComponent },
  { path: 'subscription', component: SubscriptionListComponent },
  { path: 'cars', component: CarsListComponent },
  { path: 'createAccessoire', component: CreateAccessoireComponent },
  { path: 'createGarage', component: CreateGarageComponent },
  { path: 'accessoire', component: AccessoireListComponent },
  { path: 'payments', component: PaymentListComponent },
  { path: 'createReport/:id', component: CreateReportComponent },
  { path: 'update/:id', component: UpdateUserComponent },
  { path: 'report/:id', component: UpdateReportComponent },
  { path: 'updateGarage/:id', component: UpdateGarageComponent},
  { path: 'updateReport/:id', component: UpdateReportComponent},
  { path: 'updateAccessoire/:id', component: UpdateAccessoireComponent},
  { path: 'updateCar/:id', component: UpdateCarComponent},
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'details/:id', component: UserDetailsComponent },
  { path: 'detailsSubscription/:id', component: SubscriptionDetailsComponent },
  { path: 'carDetails/:id', component: CarDetailsComponent },
  { path: 'detailsPayment/:id', component: PaymentDetailsComponent },
  { path: 'detailsUserCars/:id', component: ProfileCarComponent},
  { path: 'detailsAccessoire/:id', component: AccessoireDetailsComponent},
  { path: 'profileSubscription/:id', component: ProfileSubscriptionComponent},
  { path: 'profilePayment/:id', component: ProfilePaymentComponent},
  { path: 'profileReport/:id', component: ProfileReportComponent},
  { path: 'detailsGarage/:id', component: GarageDetailsComponent },
  { path: 'detailsCars/:id', component: CarsDetailsComponent },
  { path: 'detailsReport/:id', component: ReportDetailsComponent },
  { path: 'payment/:id', component: PaymentComponent },
  { path: 'payments/:id', component: PaymentsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
