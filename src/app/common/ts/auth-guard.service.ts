import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FcmNotificationHandlerService } from '../../fcm-notification/fcm-notification-handler.service';
import { FcmInitializerService } from './fcm-initializer.service';
import { LocalStorageService } from './local-storage.service';
import {Configuration} from '../../app.constants';
import {UtilityService} from './utility.service';

/**
 * This class is used for protecting routes
 * It checks if user is authetnicated or not, and based on that allow user to access routes
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService,
    private configuration: Configuration,
    @Inject(FcmNotificationHandlerService) private fcmNotificationHandlerService,
    @Inject(FcmInitializerService) private fcmInitializerService
  ) { }

  /**
   * This method checks if user is authenticated or not and based on that return boolean
   * 
   * @param  {ActivatedRouteSnapshot} route
   * @param  {RouterStateSnapshot} state
   */
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
    this.utilityService.navigateToState(this.configuration.STATES.login);
    return false;
  }
}
