import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class IsAlreadyLoggedinService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('auth') && localStorage.getItem('user')) {
      // already logged in so redirect to home page with the return url
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
