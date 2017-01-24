import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DatatableComponent } from './datatable/datatable.component';
import { UpdateDatatableComponent } from './update-datatable/update-datatable.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';

import { AuthGuardService } from './common/ts/auth-guard.service';

import { Configuration } from './app.constants';

// Route Configuration
export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'datatable', component: DatatableComponent },
  { path: 'updateData/:name/:email/:age/:city', component: UpdateDatatableComponent },
  { path: 'infiniteScroll', component: InfiniteScrollComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];
