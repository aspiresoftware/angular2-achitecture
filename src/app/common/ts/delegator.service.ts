import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Wove } from 'aspect.js-angular';

import { Configuration } from '../../app.constants';

import { UserModel } from '../../common/models/userModel.structure';
import { RegisterModel } from '../../common/models/registerModel.structure';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Wove()
@Injectable()
export class DelegatorService {

  private headers: Headers;
  private server: string;

  constructor(
    private _http: Http,
    private _configuration: Configuration
  ) {
    this.server = _configuration.SERVER.host + _configuration.SERVER.apiUrl;
  }

  // TODO : Need to remove this function once noopur will fix header stuff and uncomment below get function
  public get(url: string) {

    // Prepare header
    // let headers: Headers = this.prepareHeader(data);

    // Create a request option
    // let options = new RequestOptions({ headers: headers });

    url = this._configuration.SERVER.host + this._configuration.SERVER.apiUrl + url;

    return this._http.get(url) // ...using get request
      .map((res: Response) => {
        return res.json();
      }) // ...and calling .json() on the response to return data
      .catch(this.handleError); // ...errors if any
  }

  // public get<T> (data: {new(): T;}, url: string): Observable<T[]> {

  //   // Prepare header
  //   let headers: Headers = this.prepareHeader(data);

  //   // Create a request option
  //   let options = new RequestOptions({ headers: headers });

  //   url = this._configuration.SERVER.host + this._configuration.SERVER.apiUrl + url;

  //   return this._http.get(url, options) // ...using post request
  //     .map((res:Response) => {
  //         return <T[]>res.json();
  //     }) // ...and calling .json() on the response to return data
  //     .catch(this.handleError); //...errors if any
  // }

  public put<T>(data: { new (): T; }, url: string): Observable<T[]> {

    // Prepare header
    const headers: Headers = this.prepareHeader(data);

    // Create a request option
    const options = new RequestOptions({ headers: headers });

    url = this._configuration.SERVER.host + this._configuration.SERVER.apiUrl + url;

    return this._http.put(url, data, options) // ...using post request
      .map((res: Response) => {
        return <T[]>res.json();
      }) // ...and calling .json() on the response to return data
      .catch(this.handleError); // ...errors if any
  }

  public delete<T>(data: { new (): T; }, url: string): Observable<T[]> {

    // Prepare header
    const headers: Headers = this.prepareHeader(data);

    // Create a request option
    const options = new RequestOptions({ headers: headers });

    url = this._configuration.SERVER.host + this._configuration.SERVER.apiUrl + url;

    return this._http.delete(url, options) // ...using post request
      .map((res: Response) => {
        return <T[]>res.json();
      }) // ...and calling .json() on the response to return data
      .catch(this.handleError); // ...errors if any
  }

  public post<T>(data: { new (): T; }, url: string): Observable<T[]> {

    // Prepare header
    const headers: Headers = this.prepareHeader(data);

    // Create a request option
    const options = new RequestOptions({ headers: headers });

    url = this._configuration.SERVER.host + this._configuration.SERVER.apiUrl + url;

    return this._http.post(url, data, options) // ...using post request
      .map((res: Response) => {
        return <T[]>res.json();
      }) // ...and calling .json() on the response to return data
      .catch(this.handleError); // ...errors if any
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
        'Authorization': 'Bearer ' + window.btoa(data.refreshToken)
      });
    } else {
      // get access token from session
    }

    return headers;
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
