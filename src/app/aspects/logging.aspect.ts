import {Injectable} from '@angular/core';
import {beforeMethod, afterMethod, onThrowOfMethod, Metadata} from 'aspect.js';

import { ErrorNotifierService } from '../common/ts/error-notifier.service';

/**
 * Code related to aspect goes here
 */
@Injectable()
export class LoggingAspect {

  constructor(
    private errorNotifierService: ErrorNotifierService
  ) {
  }

  /**
   * This method called on every error
   * @param  {Error} error
   */
  invokeOnThrowOfMethod(error: Error) {
    console.log(`%c Inside of the logger. ERROR : `
    , 'color: red;', error);
    this.errorNotifierService.notifyError(error);
  }

  /**
   * This decorator is applyied to 'invokeBeforeMethod'
   */
  @beforeMethod({
    classNamePattern: /(Login|Delegator|Utility)Service/,
    methodNamePattern: /^(get|put|post|delete|authenticateUser|handleRespone)/
  })

  /**
   * This method is called before every method which matches the pattern
   */
  invokeBeforeMethod(meta: Metadata) {
    console.log(`%c Inside of the logger. BeforeMethodCall ${meta.className}.${meta.method.name} with args: `
    , 'color: grey;', meta.method.args, `.` );
  }

  /**
   * This decorator is applyied to 'invokeAfterMethod'
   */
  @afterMethod({
    classNamePattern: /(Login|Delegator|Utility)Service/,
    methodNamePattern: /^(get|put|post|delete|authenticateUser|handleRespone)/
  })

  /**
   * This method is called after every method which matches the pattern
   */
  invokeAfterMethod(meta: Metadata) {
    console.log(`%c Inside of the logger. AfterMethodCall ${meta.className}.${meta.method.name} with args: `
    , 'color: green;', meta.method.args, `.`);
  }

}
