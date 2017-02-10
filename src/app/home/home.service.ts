import { Injectable } from '@angular/core';
import { Configuration } from '../app.constants';
import { DelegatorService } from '../common/ts/delegator.service';

@Injectable()
export class HomeService {

  private actionUrl: {
    EULAurl: string,
    userUrl: string
  };

  constructor(
    private _configuration: Configuration,
    private delegatorService: DelegatorService
  ) {
    this._configuration = _configuration;
    this.actionUrl = {
      EULAurl: _configuration.REST_URL.eula,
      userUrl: _configuration.REST_URL.user
    };
  }

  public getEULA(successCallback) {
    return this.delegatorService.get(this.actionUrl.EULAurl, successCallback);
  }
}
