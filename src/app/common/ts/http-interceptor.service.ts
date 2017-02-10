import { Injectable, Injector } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { AuthRefresherService } from './auth-refresher.service';
import { ErrorNotifierService } from './error-notifier.service';

@Injectable()
export class HttpInterceptorService extends Http {

  private authRefresherService: AuthRefresherService;
  private backend: XHRBackend;

  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    _injector: Injector
  ) {
    setTimeout(() => {
      this.authRefresherService = _injector.get(AuthRefresherService);
    });
    super(backend, defaultOptions);
  }

  /**
   * Performs any type of http request.
   * @param url
   * @param options
   * @returns {Observable<Response>}
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    console.log('****intercepted');
    return super.request(url, options).catch((error: Response) => {
        if (error.status === 419) {
            console.log('The authentication session expires');
            this.authRefresherService.interceptSessionExpired();
        }
        return Observable.throw(error);
    });
  }

}
