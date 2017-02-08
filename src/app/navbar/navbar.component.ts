import { Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import { NavbarService } from './navbar.service';
import {EventListenerService} from '../common/ts/event-listener.service';
import {FcmNotificationConstatntService} from '../fcm-notification/fcm-notification-constant.service';
import { InfiniteScrollService } from '../infinite-scroll/infinite-scroll.service';
import {NotificationSharedServiceService} from '../common/ts/shared-service/notification-shared-service.service';
import { Observable } from 'rxjs/Rx';
import { UtilityService } from '../common/ts/utility.service';
import {Configuration} from '../app.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showNavBar: boolean = false;
  pagination: any = {};
  data: any;
  notificationCount: number;
  private NOTIFICATION_TYPE = this.fcmNotificationConstatntService.FCM_NOTIFICATION_EVENT;


  // TODO: retrieve the unread notification count from server
  // and set it to @notificationCount

  constructor(
    private navbarService: NavbarService,
    private utilityService: UtilityService,
    private configuration: Configuration,
    private route: Router,
    private infiniteScrollService: InfiniteScrollService,
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
  }

  resetNotificationCount() {
    this.setBadge(0);
    this.broadCastNotificationCount();
  }

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

  getMoreUnReadNotifications() {
    if (this.pagination.hasNext) {
      this.pagination.page += 1;
      this.retrieveData();
    } else if (typeof this.pagination.hasNext === 'undefined') {
      this.pagination.page = 1;
      this.retrieveData();
    }
  }

  broadCastNotificationCount() {
    this.notificationSharedServiceService.announceNotification
    (this.notificationCount);
  }

  retrieveData() {
    const operation: Observable<any> = this.infiniteScrollService.getData(this.pagination.page);
    const success = (res) => {
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
    this.utilityService.handleRespone(operation, success);
  }

}
