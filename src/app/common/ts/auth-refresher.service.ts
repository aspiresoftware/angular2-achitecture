import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Configuration } from '../../app.constants';

import { LocalStorageService } from './local-storage.service';
import { DelegatorService } from './delegator.service';
import { LoginService } from '../../login/login.service';

/**
 * This class implementes auth-refresher mechanism
 */
@Injectable()
export class AuthRefresherService {

  lockedForRefresh = false;
  private delegatorService: DelegatorService;
  private loginService: LoginService;

  constructor(
    private _configuration: Configuration,
    private _injector: Injector,
    private localStorageService: LocalStorageService
  ) {
    setTimeout(() => {
      this.delegatorService = _injector.get(DelegatorService);
      this.loginService = _injector.get(LoginService);
    });
  }

  public refresh() {

    const refreshToken = this.localStorageService.getValue('refreshToken');

    /**
     * Sets new access token and refresh token to localStorage and
     * Unlocks the requests from delegator service
     * 
     * @param  {} result
     */
    const refreshTokenSuccess = (result) => {
        console.log(result);
        this.localStorageService.setValue('accessToken', result.accessToken);
        this.localStorageService.setValue('refreshToken', result.refreshToken);
        this.lockedForRefresh = false;
        this.delegatorService.unLockRequest();
      };

      // Send request for new access token
    const operation: Observable<any> = this.loginService.refreshAccessToken(refreshToken, refreshTokenSuccess);
  }
  /**
   * Set lockedForRefresh as true
   * Lock all the upcoming request in delegator service
   */
  public interceptSessionExpired() {
    if (!this.lockedForRefresh) {
      this.lockedForRefresh = true;

      // queue the requests
      this.delegatorService.lockRequest();
      this.refresh();
    }
  }
}
