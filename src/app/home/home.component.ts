import { Component, OnInit, Inject } from '@angular/core';
import {EventListenerService} from '../common/ts/event-listener.service';
import {FcmNotificationConstatntService} from '../fcm-notification/fcm-notification-constant.service';
import {FcmNotificationHandlerService} from '../fcm-notification/fcm-notification-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private NOTIFICATION_TYPE = this.fcmNotificationConstatntService.FCM_NOTIFICATION_EVENT;

  constructor(@Inject(EventListenerService) private eventListenerService,
  @Inject(FcmNotificationConstatntService) private fcmNotificationConstatntService) { }

  ngOnInit() {
    this.eventListenerService.onEvent(this.NOTIFICATION_TYPE.NOTIFICATION_TYPE_TEST,
    this.onGetNotification);
  }


  onGetNotification(data) {
    console.log('Notification receieved', data);
  }


}
