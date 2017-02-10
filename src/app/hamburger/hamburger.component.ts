import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import { Router } from '@angular/router';
import {NotificationSharedServiceService} from '../common/ts/shared-service/notification-shared-service.service';
import {Configuration} from '../app.constants';

/**
 * 
 */
@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})

export class HamburgerComponent implements OnInit {

  showNavBar: boolean = false;
  notificationCount;

  constructor(
    private navbarService: NavbarService,
    private router: Router,
    private configuration: Configuration,
    private notificationSharedServiceService: NotificationSharedServiceService
  ) {
    // TODO: make one common code for route change
    /**
     * @param  {any} (url
     */
    router.events.subscribe((url: any) => {
      if (localStorage.getItem('auth') && localStorage.getItem('user')) {
        // logged in so true
        if (url.url === this.configuration.ROUTES.login ||
         url.url === this.configuration.ROUTES.register) {
          this.navbarService.showNavBar(false);
        } else {
          this.navbarService.showNavBar(true);
        }
      }
    });

    /**
     * @param  {} mode
     */
    this.navbarService.showNavBarEmitter.subscribe((mode) => {
      // mode will be null the first time it is created, so you need to igonore it when null
      if (mode !== null) {
        this.showNavBar = mode;
      }
    });
  }

  /**
   * @param  {} notificationCount
   */
  onUpdateNotification(notificationCount) {
    this.notificationCount = notificationCount;
  }

  ngOnInit() {
    this.notificationSharedServiceService.notificationAnnounced$
    .subscribe((notification) => {this.onUpdateNotification(notification); });
  }
}
