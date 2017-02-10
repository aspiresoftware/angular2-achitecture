import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

/**
 * 
 */
@Injectable()
export class IsAlreadyLoggedinService implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  /**
   * @param  {ActivatedRouteSnapshot} route
   * @param  {RouterStateSnapshot} state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorageService.getValue('accessToken')) {
    // already logged in so redirect to home page with the return url
    this.router.navigate(['home']);
      return false;
    }

    return true;
  }
}
