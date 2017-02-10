import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { AuthRefresherService } from './auth-refresher.service';
import { ErrorNotifierService } from './error-notifier.service';

@Injectable()
export class HttpInterceptorService extends Http {

  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    // private authRefresherService: AuthRefresherService,
    // private errorNotifierService: ErrorNotifierService 
  ) {
    super(backend, defaultOptions);
  }

  /**
   * Performs any type of http request.
   * @param url
   * @param options
   * @returns {Observable<Response>}
   */
  // request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
  //   console.log('****intercepted');
  //   return super.request(url, options).catch((error: Response) => {
  //     console.log('****', error);
  //     this.errorNotifierService.notifyError(error);
  //       if (error.status === 419) {
  //           console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
  //           this.authRefresherService.interceptSessionExpired();
  //       }
  //       return Observable.throw(error);
  //   });
  // }

}
