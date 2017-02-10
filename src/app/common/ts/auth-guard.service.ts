import { Injectable, Inject} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FcmNotificationHandlerService } from '../../fcm-notification/fcm-notification-handler.service';
import { FcmInitializerService } from './fcm-initializer.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    @Inject(FcmNotificationHandlerService) private fcmNotificationHandlerService,
    @Inject(FcmInitializerService) private fcmInitializerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorageService.getValue('accessToken') &&
    (this.fcmNotificationHandlerService.isFCMInitialized === false)) {
      this.fcmInitializerService.initialiseAppForFcm();
    }

    if (localStorage.getItem('auth') && localStorage.getItem('user')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['login']);
    return false;
  }
}
