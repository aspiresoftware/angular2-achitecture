import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DatatableComponent } from './datatable/datatable.component';
import { UpdateDatatableComponent } from './update-datatable/update-datatable.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
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
  { path: 'datatable', component: DatatableComponent, canActivate: [AuthGuardService] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuardService] },
  { path: 'updateData/:name/:email/:age/:city', component: UpdateDatatableComponent, canActivate: [AuthGuardService] },
  { path: 'infiniteScroll', component: InfiniteScrollComponent, canActivate: [AuthGuardService] },
  { path: 'charts', component: ChartsComponent, canActivate: [AuthGuardService] },
  { path: 'd3Charts', component: D3ChartsComponent, canActivate: [AuthGuardService] },
  { path: 'formElements', component: FormElementsComponent, canActivate: [AuthGuardService] },
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];
