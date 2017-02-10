import { Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import { NavbarService } from './navbar.service';
import {EventListenerService} from '../common/ts/event-listener.service';
import {NavbarEventHandlerService} from '../common/ts/shared-service/navbar-event-handler.service';

import {FcmNotificationConstatntService} from '../fcm-notification/fcm-notification-constant.service';
import { ServicesListService } from '../serviceslist/serviceslist.service';
import {NotificationSharedServiceService} from '../common/ts/shared-service/notification-shared-service.service';
import { Observable } from 'rxjs/Rx';
import { UtilityService } from '../common/ts/utility.service';
import {Configuration} from '../app.constants';

/**
 * Nabar Component
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showNavBar: boolean = false;
  pagination: any = {};
  data: any;
  notificationCount: number;
  showHeaderPart: string;
  headerTitle: string;
  private NOTIFICATION_TYPE = this.fcmNotificationConstatntService.FCM_NOTIFICATION_EVENT;


  // TODO: retrieve the unread notification count from server
  // and set it to @notificationCount

  constructor(
    private navbarService: NavbarService,
    private utilityService: UtilityService,
    private configuration: Configuration,
    private route: Router,
    private servicesListService: ServicesListService,
    private navbarEventHandlerService: NavbarEventHandlerService,
    private notificationSharedServiceService: NotificationSharedServiceService,
    @Inject(EventListenerService) private eventListenerService,
    @Inject(FcmNotificationConstatntService) private fcmNotificationConstatntService
  ) {
    this.navbarService.showNavBarEmitter.subscribe((mode) => {
      // mode will be null the first time it is created, so you need to igonore it when null
      if (mode !== null) {
        this.showNavBar = mode;
      }
    });
  }

  ngOnInit() {
    this.eventListenerService.onEvent(this.NOTIFICATION_TYPE.NOTIFICATION_TYPE_TEST,
    (data) => {this.onGetNotification(data); });
    this.getMoreUnReadNotifications();
    this.route.events.subscribe((url: any) => {
      if (localStorage.getItem('auth') && localStorage.getItem('user')) {
        // logged in so true
          this.showHeaderPart = url.url;
          this.headerTitle = this.getHeaderTitle(url.url);
      }
    });
  }

  /**
   * @param  {} locationUrl
   */
  getHeaderTitle(locationUrl) {
    const url = locationUrl.split('/')[1];
    const title = url.substr(0, 1);
    const titleCovered = url.substr(1, url.length);
    return title + titleCovered;
  }

  /**
   * Resset notification count
   */
  resetNotificationCount() {
    this.setBadge(0);
    this.broadCastNotificationCount();
  }

  /**
   * Get notification
   * 
   * @param  {} data
   */
  onGetNotification(data) {
    if (this.route.url !== this.configuration.ROUTES.notifications) {
      console.log('Navbar Notification receieved', data);
      this.setBadge(data.detail && data.detail.data && data.detail.data.count);
      this.broadCastNotificationCount();
      if (!this.data) {
        this.data = [];
      }
      this.data.push(data);
    }
  }

  /**
   * Set badge
   * 
   * @param  {} badgeCount
   */
  setBadge(badgeCount) {
    if (badgeCount > 0) {
      if (!this.notificationCount) {
        this.notificationCount = 0;
      }
      this.notificationCount++;
    } else {
      this.notificationCount = 0;
    }
  }

  /**
   * Get read notification
   */
  getMoreUnReadNotifications() {
    if (this.pagination.hasNext) {
      this.pagination.page += 1;
      this.retrieveData();
    } else if (typeof this.pagination.hasNext === 'undefined') {
      this.pagination.page = 1;
      this.retrieveData();
    }
  }

  /**
   * Broadcast notification count
   */
  broadCastNotificationCount() {
    this.notificationSharedServiceService.announceNotification
    (this.notificationCount);
  }

  /**
   * Generate event
   * 
   * @param  {} eventType
   * @param  {} data
   */
  generateEvent(eventType, data) {
    this.navbarEventHandlerService
    .announceNavbarEventNotification(eventType, data);
  }

  /**
   * Retrieve data
   */
  retrieveData() {
    const serviceListSuccess = (res) => {
      this.pagination.currentPage = res.currentPage;
      this.pagination.hasNext = res.hasNext;
      this.pagination.hasPrevious = res.hasPrevious;
      this.pagination.pages = res.pages;
      if (this.data) {
        this.data = this.data.concat(res.services);
      } else {
        this.data = res.services;
      }
      this.pagination.count = this.data.length;
    };
    const operation: Observable<any> = this.servicesListService.getData(this.pagination.page, serviceListSuccess);
  }

}
