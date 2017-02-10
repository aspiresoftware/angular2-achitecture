import { Injectable } from '@angular/core';
import { Configuration } from '../app.constants';
import { DelegatorService } from '../common/ts/delegator.service';

/**
 * Register Service
 */
@Injectable()
export class RegisterService {

  private actionUrl: {
    registerationUrl: string
  };

  constructor(
    private _configuration: Configuration,
    private delegatorService: DelegatorService
  ) {
    this._configuration = _configuration;
    this.actionUrl = {
      registerationUrl: _configuration.REST_URL.register
    };
  }

  /**
   * Regiter user
   * 
   * @param  {} user
   * @param  {} successCallback
   */
  public registerUser(user, successCallback) {
    return this.delegatorService.post(user, this.actionUrl.registerationUrl, '', successCallback);
  }

}
