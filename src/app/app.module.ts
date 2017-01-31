import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DataTableModule } from 'angular2-datatable';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { Configuration } from './app.constants';
import { DelegatorService } from './common/ts/delegator.service';
import { LocalStorageService } from './common/ts/local-storage.service';
import { UtilityService } from './common/ts/utility.service';
import { AuthGuardService } from './common/ts/auth-guard.service';
import { DatatableService } from './datatable/datatable.service';
import { InfiniteScrollService } from './infinite-scroll/infinite-scroll.service';

// Aspect Modules
import { LoggingAspect } from './aspects/logging.aspect';

import { RouterModule } from '@angular/router';

import { AppRoutes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { DatatableComponent } from './datatable/datatable.component';
import { UpdateDatatableComponent } from './update-datatable/update-datatable.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DatatableComponent,
    UpdateDatatableComponent,
    InfiniteScrollComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    AppComponent,
    Configuration,
    DelegatorService,
    LocalStorageService,
    UtilityService,
    AuthGuardService,
    DatatableService,
    InfiniteScrollService,
    LoggingAspect
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
