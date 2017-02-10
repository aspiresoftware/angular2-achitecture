import { Component, OnInit } from '@angular/core';
import {EventListenerService} from '../common/ts/event-listener.service';
import {FcmNotificationConstatntService} from '../fcm-notification/fcm-notification-constant.service';
import { ServicesListService } from '../serviceslist/serviceslist.service';
import { Observable } from 'rxjs/Rx';
import { UtilityService } from '../common/ts/utility.service';

/**
 * Notification Componenet
 */
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

   // Variable Declarations
  currentPage;
  hasNext;
  hasPrevious;
  pages;
  data;
  count = 0;
  page = 1;

  private NOTIFICATION_TYPE = this.fcmNotificationConstatntService.FCM_NOTIFICATION_EVENT;

  constructor(
    private servicesListService: ServicesListService,
    private eventListenerService: EventListenerService,
    private fcmNotificationConstatntService: FcmNotificationConstatntService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    const serviceListSuccess = (res) => {
      this.currentPage = res.currentPage;
      this.hasNext = res.hasNext;
      this.hasPrevious = res.hasPrevious;
      this.pages = res.pages;
      this.data = res.services;
      this.count = this.data.length;
    };
    const operation: Observable<any> = this.servicesListService.getData(this.page, serviceListSuccess);

     this.eventListenerService.onEvent(this.NOTIFICATION_TYPE.NOTIFICATION_TYPE_TEST,
    (data) => {this.onGetNotification(data); });
  }

  /**
   * Get Notification
   * 
   * @param  {} data
   */
  onGetNotification(data) {
      console.log('Navbar Notification rec0eieved', data);
      if (!this.data) {
        this.data = [];
      }
      this.data.unshift(data.detail.data);
  }

  /**
   * Get more notification
   */
  getMoreData() {
    if (this.hasNext) {
      this.page += 1;
      const serviceListPaginationSuccess = (res) => {
        this.currentPage = res.currentPage;
        this.hasNext = res.hasNext;
        this.hasPrevious = res.hasPrevious;
        this.pages = res.pages;
        this.data = this.data.concat(res.services);
        this.count = this.count + this.data.length;
      };
      const operation: Observable<any> = this.servicesListService.getData(this.page, serviceListPaginationSuccess);
    }
  }
}
