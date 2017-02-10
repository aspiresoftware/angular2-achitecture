import { Injectable } from '@angular/core';
import {Wove} from 'aspect.js-angular';

import { Router } from '@angular/router';
import { LoggingAspect } from '../../aspects/logging.aspect';
import { ErrorNotifierService } from './error-notifier.service';

@Wove()
@Injectable()
export class UtilityService {

  constructor(
    private _router: Router,
    private loggingAspect: LoggingAspect
  ) {}

  public navigateToState(state) {
    this._router.navigate([state]);
    return false;
  }

  public handleError(error) {
    this.loggingAspect.invokeOnThrowOfMethod(error);
  }
}
