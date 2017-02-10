import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { AuthRefresherService } from './auth-refresher.service';

/**
 * This class handles all errors
 */
@Injectable()
export class ErrorNotifierService {

  constructor(
    private authRefresherService: AuthRefresherService,
  ) {
  }

  /**
   * Notify error (419) to authRefresher
   * 
   * @param  {any} error
   */
  notifyError(error: any) {
    if (error.status === 419) {
      console.log('The authentication session expires');
      this.authRefresherService.interceptSessionExpired();
    }
  }
}
