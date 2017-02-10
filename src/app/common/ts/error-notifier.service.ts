import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { AuthRefresherService } from './auth-refresher.service';

@Injectable()
export class ErrorNotifierService {

  constructor(
    private authRefresherService: AuthRefresherService,
  ) {
  }

  notifyError(error: any) {
    if (error.status === 419) {
      console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
      this.authRefresherService.interceptSessionExpired();
    }
  }
}
