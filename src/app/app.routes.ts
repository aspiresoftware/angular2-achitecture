import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ServicesListComponent } from './serviceslist/serviceslist.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ChartsComponent } from './charts/charts.component';
import { D3ChartsComponent } from './d3-charts/d3-charts.component';
import { FormElementsComponent } from './form-elements/form-elements.component';

import { AuthGuardService } from './common/ts/auth-guard.service';
import { IsAlreadyLoggedinService } from './common/ts/is-already-loggedin.service';

import { Configuration } from './app.constants';

// Route Configuration
export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [IsAlreadyLoggedinService] },
  { path: 'register', component: RegisterComponent, canActivate: [IsAlreadyLoggedinService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UsersComponent , canActivate: [AuthGuardService]},
  { path: 'notifications', component: NotificationsComponent , canActivate: [AuthGuardService]},
  { path: 'updateUser/:name/:email/:age/:city', component: UpdateUserComponent , canActivate: [AuthGuardService]},
  { path: 'serviceslist', component: ServicesListComponent , canActivate: [AuthGuardService]},
  { path: 'charts', component: ChartsComponent, canActivate: [AuthGuardService] },
  { path: 'd3Charts', component: D3ChartsComponent, canActivate: [AuthGuardService] },
  { path: 'formElements', component: FormElementsComponent, canActivate: [AuthGuardService] },
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];
