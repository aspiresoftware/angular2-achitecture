import {Injectable} from '@angular/core';
import {beforeMethod, afterMethod, onThrowOfMethod, Metadata} from 'aspect.js';

@Injectable()
export class LoggingAspect {

  static invokeOnThrowOfMethod(err: Error) {
    console.log(`%c Inside of the logger. ERROR : `
    , 'color: red;', err);
  }

  constructor() {
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
