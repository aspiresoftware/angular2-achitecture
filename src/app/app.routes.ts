import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ServicesListComponent } from './serviceslist/serviceslist.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {MainComponent} from './main/main.component';
import { AuthGuardService } from './common/ts/auth-guard.service';
import { IsAlreadyLoggedinService } from './common/ts/is-already-loggedin.service';

import { Configuration } from './app.constants';

// Route Configuration
export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [IsAlreadyLoggedinService] },
  { path: 'register', component: RegisterComponent, canActivate: [IsAlreadyLoggedinService] },
  {
    path: 'app', component: MainComponent, canActivate: [AuthGuardService],
    children: [
      {
        path: '',  pathMatch: 'full', redirectTo: 'home', canActivate: [AuthGuardService]
      },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
      { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuardService] },
      { path: 'updateUser/:name/:email/:age/:city', component: UpdateUserComponent, canActivate: [AuthGuardService] },
      { path: 'serviceslist', component: ServicesListComponent, canActivate: [AuthGuardService] },
    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'app' }
];
