import { Injectable } from '@angular/core';
import { Configuration } from '../app.constants';
import { DelegatorService } from '../common/ts/delegator.service';

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

  public authenticateUser(user) {
    return this.delegatorService.post(user, this.actionUrl.authenticationUrl);
  }
}
