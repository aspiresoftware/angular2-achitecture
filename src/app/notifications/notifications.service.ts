import { Injectable } from '@angular/core';
import { Configuration } from '../app.constants';
import { DelegatorService } from '../common/ts/delegator.service';

@Injectable()
export class NotificationsService {

  private actionUrl: {
    servicesUrl: string
  };

  constructor(
    private _configuration: Configuration,
    private delegatorService: DelegatorService
  ) {
    this.actionUrl = {
      servicesUrl: this._configuration.REST_URL.services
    };
  }

  getData(page) {
    if (page <= 1) {
      return this.delegatorService.get(this.actionUrl.servicesUrl);
    } else {
      return this.delegatorService.get(this.actionUrl.servicesUrl + '?page=' + page);
    }
  }

}
