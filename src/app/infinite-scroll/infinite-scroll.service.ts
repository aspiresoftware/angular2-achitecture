import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class InfiniteScrollService {

  constructor(
    private http:Http
  ) {
    console.log('Executing : InfiniteScrollService');
  }

  getData() {
    console.log('Executing : getDataService');

    return this.http.get('app/data.json')
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
