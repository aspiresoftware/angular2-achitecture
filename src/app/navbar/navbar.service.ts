import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/**
 * Navbar service
 */
@Injectable()
export class NavbarService {

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  constructor() { }

  /**
   * Show navbar
   * 
   * @param  {boolean} ifShow
   */
  showNavBar(ifShow: boolean) {
    this._showNavBar.next(ifShow);
  }

}
