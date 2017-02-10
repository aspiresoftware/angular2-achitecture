import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Wove } from 'aspect.js-angular';

import { Configuration } from '../../app.constants';

import { UserModel } from '../../common/models/userModel.structure';
import { RegisterModel } from '../../common/models/registerModel.structure';
import { LocalStorageService } from './local-storage.service';
import { UtilityService } from './utility.service';
// import { LoggingAspect } from '../../aspects/logging.aspect';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Wove()
@Injectable()
export class DelegatorService {

  headers: Headers;
  server: string;
  lockedForRefresh = false;
  delayRequests: Object = {};
  runningRequests: Object = {};
  requestCounter = 0;

  constructor(
    private _http: Http,
    private _configuration: Configuration,
    private localStorageService: LocalStorageService,
    private utility: UtilityService
  ) {
    this.server = _configuration.SERVER.host + _configuration.SERVER.apiUrl;
  }

  public http<T> (config) {

    if (this.lockedForRefresh && !config.noDelay) {
      this.storeDelayedRequest(config);
    } else {
      const requestId = this.nextRequestId();
      let observer;

      if (config.method === 'get' || config.method === 'delete') {
        observer = this._http[config.method](config.url, config.options); // ...using get/delete request
      } else {
        observer = this._http[config.method](config.url, config.data, config.options); // ...using post/put request
      }
      // observer.map((res: Response) => {
      //   delete this.runningRequests[requestId];
      //   return <T[]>res.json();
      // }) // ...and calling .json() on the response to return data
      // .catch((res: Response) => {
      //   if (res.status !== 419) {
      //     delete this.runningRequests[requestId];
      //   }
      //   return this.handleError(res);
      // }); // ...errors if any
      const tracker = {
        requestId: requestId,
        config: config
      };
      this.runningRequests[requestId] = tracker;
      return this.handleRespone(<T>observer, tracker);
    }

  }

  public buildConfig(url, data, method, successCallback) {

    const config: any = {};

    // Prepare header
    const headers: Headers = this.prepareHeader(data);

    // Create a request option
    const options = new RequestOptions({ headers: headers });

    const urlNeedsExpansion = !(/^\w+:\/\//.test(url)) && !config.domainAlreadyAdded;

    if (urlNeedsExpansion) {
      url = this._configuration.SERVER.host + this._configuration.SERVER.apiUrl + url;
    }

    config.url = url;
    config.options = options;
    config.data = data;
    config.method = method;
    config.successCallback = successCallback;
    return config;
  }

  public post<T> (data: {new(): T; }, url: string, customConfig, successCallback): Observable<T[]> {

    const config = this.buildConfig(url, data, 'post', successCallback);
    if (customConfig) {
      config.noDelay = customConfig.noDelay;
    }
    return this.http<T>(config);
  }

  public get<T> ( url: string, successCallback): Observable<T[]> {

    const config = this.buildConfig(url, '', 'get', successCallback);
    return this.http<T>(config);
  }


  public put<T> (data: {new(): T; }, url: string, successCallback): Observable<T[]> {

    const config = this.buildConfig(url, data, 'put', successCallback);
    return this.http<T>(config);
  }

  public delete<T> (data: {new(): T; }, url: string, successCallback): Observable<T[]> {

    const config = this.buildConfig(url, '', 'delete', successCallback);
    return this.http<T>(config);
  }


  private prepareHeader(data) {
    // Set content type to JSON
    let headers: Headers;

    if (data.email && data.password) {
      // basic header for requesting access token
      headers = new Headers({
        'Authorization': 'Basic ' + window.btoa(data.email + ':' + data.password)
      });
    } else if (data.refreshToken) {
      // Bearer with refresh token
      headers = new Headers({
        'Authorization': 'Bearer ' + data.refreshToken
      });
    } else {
      // get access token from session
      const accessToken = this.localStorageService.getValue('accessToken');
      headers = new Headers({
        'Authorization': 'Bearer ' + accessToken
      });
    }

    return headers;
  }

  // private handleError(error: Response) {
  //     return Observable.throw(error.json().errors || error);
  // }

  private handleRespone<T> (observer, tracker) {
     return observer.subscribe(
      (result: Response) => {
        delete this.runningRequests[tracker.requestId];
        tracker.config.successCallback(<T>result.json());
      },
      error => {
        if (error.status !== 419) {
          delete this.runningRequests[tracker.requestId];
        }
        this.utility.handleError(error);
      });
  }

  public lockRequest() {
    this.lockedForRefresh = true;
  }

  public unLockRequest() {
    this.lockedForRefresh = false;
    this.executeRunningRequests();
    this.executeDelayedRequests();
  }

  public storeDelayedRequest(config) {
    const requestId = this.nextRequestId();
    const tracker = {
      requestId: requestId,
      config: config
    };
    this.delayRequests[requestId] = tracker;
  }

  private nextRequestId() {
    // Increment requestCounter and return new number as a string
    return this.requestCounter += 1;
  }

  private executeRunningRequests() {
    for (const key in this.runningRequests) {
      if (this.runningRequests.hasOwnProperty(key)) {
        this.executeRequests(this.runningRequests[key]);
        delete this.runningRequests[key];
      }
    }
  }

  private executeDelayedRequests() {
    for (const key in this.delayRequests) {
      if (this.delayRequests.hasOwnProperty(key)) {
        this.executeRequests(this.delayRequests[key]);
        delete this.runningRequests[key];
      }
    }
  }

  private executeRequests(request) {
    const config = this.buildConfig(
      request.config.url,
      request.config.data,
      request.config.method,
      request.config.successCallback);
    return this.http<any>(config);
  }
}
