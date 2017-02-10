import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Wove } from 'aspect.js-angular';

import { Configuration } from '../../app.constants';

import { UserModel } from '../../common/models/userModel.structure';
import { RegisterModel } from '../../common/models/registerModel.structure';

import { LocalStorageService } from './local-storage.service';
import { UtilityService } from './utility.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * This class handles REST interaction with server, send REST to server and recieve response from server
 * 
 */
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

  /**
   * Get request config and send request to server
   * Return observer
   * 
   * @param  {} config
   */
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

      // store request's config and store it in runningRequests
      const tracker = {
        requestId: requestId,
        config: config
      };
      this.runningRequests[requestId] = tracker;

      return this.handleRespone(<T>observer, tracker);
    }

  }
  /**
   * Build config object of request
   * 
   * @param  {} url
   * @param  {} data
   * @param  {} method
   * @param  {} successCallback
   */
  public buildConfig(url, data, method, successCallback) {

    const config: any = {};

    // Prepare header
    const headers: Headers = this.prepareHeader(data);

    // Create a request option
    const options = new RequestOptions({ headers: headers });

    // check if usrl need expansion or not
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

  /**
   * Post requets
   * 
   * @param  {} data
   * @param  {} url
   * @param  {} customConfig
   * @param  {} successCallback
   * @returns Observable
   */
  public post<T> (data: {new(): T; }, url: string, customConfig, successCallback): Observable<T[]> {

    const config = this.buildConfig(url, data, 'post', successCallback);
    if (customConfig) {
      config.noDelay = customConfig.noDelay;
    }
    return this.http<T>(config);
  }

  /**
   * Get requets
   * 
   * @param  {} url
   * @param  {} customConfig
   * @param  {} successCallback
   * @returns Observable
   */
  public get<T> ( url: string, successCallback): Observable<T[]> {

    const config = this.buildConfig(url, '', 'get', successCallback);
    return this.http<T>(config);
  }

  /**
   * Post requets
   * 
   * @param  {} data
   * @param  {} url
   * @param  {} customConfig
   * @param  {} successCallback
   * @returns Observable
   */
  public put<T> (data: {new(): T; }, url: string, successCallback): Observable<T[]> {

    const config = this.buildConfig(url, data, 'put', successCallback);
    return this.http<T>(config);
  }

  /**
   * Post requets
   * 
   * @param  {} data
   * @param  {} url
   * @param  {} customConfig
   * @param  {} successCallback
   * @returns Observable
   */
  public delete<T> (data: {new(): T; }, url: string, successCallback): Observable<T[]> {

    const config = this.buildConfig(url, '', 'delete', successCallback);
    return this.http<T>(config);
  }

  /**
   * Prepare header for request
   * 
   * @param  {} data
   */
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
  /**
   * handle observer after compeltion of request
   * 
   * @param  {} observer
   * @param  {} tracker
   */
  private handleRespone<T> (observer, tracker) {
     return observer.subscribe(
      (result: Response) => {
        // success in getting response
        // delete request from runningRequests
        delete this.runningRequests[tracker.requestId];
        tracker.config.successCallback(<T>result.json());
      },
      error => {
        // error in getting response
        if (error.status !== 419) {
          // if error's status is not 419 then delete request from runningRequests
          delete this.runningRequests[tracker.requestId];
        }
        this.utility.handleError(error);
      });
  }
  /**
   * Lock requests, it won't interact to server and store requests
   */
  public lockRequest() {
    this.lockedForRefresh = true;
  }

  /**
   * Lock requests, execute requests from executeDelayedRequests and executeRunningRequests
   */
  public unLockRequest() {
    this.lockedForRefresh = false;
    this.executeRunningRequests();
    this.executeDelayedRequests();
  }
  /**
   * Store requets after locked
   * 
   * @param  {} config
   */
  public storeDelayedRequest(config) {
    const requestId = this.nextRequestId();
    const tracker = {
      requestId: requestId,
      config: config
    };
    this.delayRequests[requestId] = tracker;
  }

  /**
   * Increment requestCounter and return new number as a string
   */
  private nextRequestId() {
    return this.requestCounter += 1;
  }

  /**
   * Execute running requests
   */
  private executeRunningRequests() {
    for (const key in this.runningRequests) {
      if (this.runningRequests.hasOwnProperty(key)) {
        this.executeRequests(this.runningRequests[key]);
        delete this.runningRequests[key];
      }
    }
  }

  /**
   * Executes delayed requests
   */
  private executeDelayedRequests() {
    for (const key in this.delayRequests) {
      if (this.delayRequests.hasOwnProperty(key)) {
        this.executeRequests(this.delayRequests[key]);
        delete this.runningRequests[key];
      }
    }
  }

  /**
   * Execute requests
   * 
   * @param  {} request
   */
  private executeRequests(request) {
    const config = this.buildConfig(
      request.config.url,
      request.config.data,
      request.config.method,
      request.config.successCallback);
    return this.http<any>(config);
  }
}
