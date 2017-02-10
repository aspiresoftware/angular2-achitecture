import {Injectable} from '@angular/core';
import {beforeMethod, afterMethod, onThrowOfMethod, Metadata} from 'aspect.js';

import { ErrorNotifierService } from '../common/ts/error-notifier.service';

@Injectable()
export class LoggingAspect {

  constructor(
    private errorNotifierService: ErrorNotifierService
  ) {
  }

  invokeOnThrowOfMethod(error: Error) {
    console.log(`%c Inside of the logger. ERROR : `
    , 'color: red;', error);
    this.errorNotifierService.notifyError(error);
  }

  @beforeMethod({
    classNamePattern: /(Login|Delegator|Utility)Service/,
    methodNamePattern: /^(get|put|post|delete|authenticateUser|handleRespone)/
  })

  invokeBeforeMethod(meta: Metadata) {
    console.log(`%c Inside of the logger. BeforeMethodCall ${meta.className}.${meta.method.name} with args: `
    , 'color: grey;', meta.method.args, `.` );
  }

  @afterMethod({
    classNamePattern: /(Login|Delegator|Utility)Service/,
    methodNamePattern: /^(get|put|post|delete|authenticateUser|handleRespone)/
  })

  invokeAfterMethod(meta: Metadata) {
    console.log(`%c Inside of the logger. AfterMethodCall ${meta.className}.${meta.method.name} with args: `
    , 'color: green;', meta.method.args, `.`);
  }

}
