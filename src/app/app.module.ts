import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { Configuration } from './app.constants';
import { DelegatorService } from './common/ts/delegator.service';
import { LocalStorageService } from './common/ts/local-storage.service';
import { UtilityService } from './common/ts/utility.service';
import { AuthGuardService } from './common/ts/auth-guard.service';

import { RouterModule } from '@angular/router';

import { AppRoutes } from './app.routes';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    AppComponent,
    Configuration,
    DelegatorService,
    LocalStorageService,
    UtilityService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }