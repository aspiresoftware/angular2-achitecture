import { Injectable } from '@angular/core';
import {Wove} from 'aspect.js-angular';

import { Configuration } from '../app.constants';
import { DelegatorService } from '../common/ts/delegator.service';

/**
 * Login serevice
 */
@Wove()
@Injectable()
export class LoginService {

  private actionUrl: {
    authenticationUrl: string
  };

  constructor(
    private _configuration: Configuration,
    private delegatorService: DelegatorService
  ) {
    this._configuration = _configuration;
    this.actionUrl = {
      authenticationUrl: _configuration.REST_URL.login
    };
  }

  /**
   * Authenticate user
   * 
   * @param  {} user
   * @param  {} successCallback
   */
  public authenticateUser(user, successCallback) {
    return this.delegatorService.post(user, this.actionUrl.authenticationUrl, '', successCallback);
  }

  /**
   * Refresh access token
   * 
   * @param  {} refreshToken
   * @param  {} successCallback
   */
  public refreshAccessToken(refreshToken, successCallback) {
    const data: any  = {
      grantType: 'accessToken',
      refreshToken: refreshToken
    };
    const config  = {
      noDelay: true
    };

    return this.delegatorService.post(data, this.actionUrl.authenticationUrl, config, successCallback);
  }
}
