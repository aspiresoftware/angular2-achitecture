import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import { Subject } from 'rxjs/Subject';
import {Configuration} from '../../../app.constants';

@Injectable()
export class NavbarEventHandlerService {


  // Observable string sources
  private navbarEventSource = new Subject();
  navbarEventAnnounced$ = this.navbarEventSource.asObservable();

  constructor(route: Router,
    private configuration: Configuration) {
  }

  announceNavbarEventNotification(eventType, notification) {
    this.navbarEventSource.next({eventType: eventType, notification: notification});
  }

}
