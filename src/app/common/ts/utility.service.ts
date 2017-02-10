import { Injectable } from '@angular/core';
import {Wove} from 'aspect.js-angular';

import { Router } from '@angular/router';
import { LoggingAspect } from '../../aspects/logging.aspect';
import { ErrorNotifierService } from './error-notifier.service';

/**
 * Utility service
 */
@Wove()
@Injectable()
export class UtilityService {

  constructor(
    private _router: Router,
    private loggingAspect: LoggingAspect
  ) {}

  /**
   * Navigation utility
   * 
   * @param  {} state
   */
  public navigateToState(state) {
    this._router.navigate([state]);
  }

  /**
   * Handle errors
   * 
   * @param  {} error
   */
  public handleError(error) {
    this.loggingAspect.invokeOnThrowOfMethod(error);
  }
}
