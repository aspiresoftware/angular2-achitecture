import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DataTableModule } from 'angular2-datatable';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { ChartsModule } from 'ng2-charts';
import { Ng2CompleterModule } from 'ng2-completer';
import { SelectModule } from 'angular2-select';
import { SliderModule, InputSwitchModule } from 'primeng/primeng';
import { nvD3 } from 'ng2-nvd3';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { Configuration } from './app.constants';
import { LoginService } from './login/login.service';
import { DelegatorService } from './common/ts/delegator.service';
import { LocalStorageService } from './common/ts/local-storage.service';
import { UtilityService } from './common/ts/utility.service';
import { AuthGuardService } from './common/ts/auth-guard.service';
import { HttpInterceptorService } from './common/ts/http-interceptor.service';
import { ErrorNotifierService } from './common/ts/error-notifier.service';
import { AuthRefresherService } from './common/ts/auth-refresher.service';
import { UsersService } from './users/users.service';
import { ServicesListService } from './serviceslist/serviceslist.service';

import { IsAlreadyLoggedinService } from './common/ts/is-already-loggedin.service';
import { FcmInitializerService } from './common/ts/fcm-initializer.service';

// Aspect Modules
import { LoggingAspect } from './aspects/logging.aspect';

import { RouterModule } from '@angular/router';

import { AppRoutes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ServicesListComponent } from './serviceslist/serviceslist.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HamburgerComponent } from './hamburger/hamburger.component';

import { FcmNotificationModule } from './fcm-notification/fcm-notification.module';
import { EventListenerService } from './common/ts/event-listener.service';
import { NotificationSharedServiceService } from './common/ts/shared-service/notification-shared-service.service';
import { NavbarEventHandlerService } from './common/ts/shared-service/navbar-event-handler.service';

import { AngularFireModule } from 'angularfire2';
import { NotificationsComponent } from './notifications/notifications.component';
import { MainComponent } from './main/main.component';
import { ChartsComponent } from './charts/charts.component';
import { FormElementsComponent } from './form-elements/form-elements.component';
import { D3ChartsComponent } from './d3-charts/d3-charts.component';

// Must export the config


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UsersComponent,
    UpdateUserComponent,
    ServicesListComponent,
    NavbarComponent,
    HamburgerComponent,
    NotificationsComponent,
    MainComponent,
    ChartsComponent,
    FormElementsComponent,
    D3ChartsComponent,
    nvD3
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    FcmNotificationModule,
    ChartsModule,
    Ng2CompleterModule,
    SelectModule,
    SliderModule,
    InputSwitchModule
  ],
  providers: [
    AppComponent,
    Configuration,
    LocalStorageService,
    UtilityService,
    LoggingAspect,
    ErrorNotifierService,
    AuthGuardService,
    DelegatorService,
    LoginService,
    AuthRefresherService,
    EventListenerService,
    FcmInitializerService,
    NotificationSharedServiceService,
    NavbarEventHandlerService,
    ServicesListService,
    IsAlreadyLoggedinService,
    UsersService,
    // { provide: XHRBackend, useClass: HttpInterceptorService }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
