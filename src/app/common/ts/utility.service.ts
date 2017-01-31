import { Injectable } from '@angular/core';
import {Wove} from 'aspect.js-angular';

import { Router } from '@angular/router';

import { LoggingAspect } from '../../aspects/logging.aspect';

@Wove()
@Injectable()
export class UtilityService {

  constructor(
    private _router: Router
  ) {}

  public navigateToState(state) {
    this._router.navigate([state]);
  }

  public handleRespone(operation, success) {
     operation.subscribe(success,
      err => {
          LoggingAspect.invokeOnThrowOfMethod(err);
     });
  }

}
