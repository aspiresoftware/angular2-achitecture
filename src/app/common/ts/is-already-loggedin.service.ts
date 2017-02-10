import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import {UtilityService} from './utility.service';
import {Configuration} from '../../app.constants';

/**
 * 
 */
@Injectable()
export class IsAlreadyLoggedinService implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService,
    private configuration: Configuration
  ) { }

  /**
   * @param  {ActivatedRouteSnapshot} route
   * @param  {RouterStateSnapshot} state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorageService.getValue('accessToken')) {
    // already logged in so redirect to home page with the return url
    this.utilityService.navigateToState(this.configuration.STATES.app);
      return false;
    }

    return true;
  }
}
