import { Component, OnInit, Inject } from '@angular/core';
import { HomeService } from './home.service';
import { ErrorNotifierService } from '../common/ts/error-notifier.service';
import { EventListenerService } from '../common/ts/event-listener.service';
import { FcmNotificationConstatntService } from '../fcm-notification/fcm-notification-constant.service';
import { FcmNotificationHandlerService } from '../fcm-notification/fcm-notification-handler.service';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  private NOTIFICATION_TYPE = this.fcmNotificationConstatntService.FCM_NOTIFICATION_EVENT;

  constructor(
    private homeService: HomeService,
    private errorNotifierService: ErrorNotifierService,
    @Inject(EventListenerService) private eventListenerService,
    @Inject(FcmNotificationConstatntService) private fcmNotificationConstatntService
  ) { }

  ngOnInit() {
    this.eventListenerService.onEvent(this.NOTIFICATION_TYPE.NOTIFICATION_TYPE_TEST,
      this.onGetNotification);

    const eulaSuccess = (result) => {
      console.log(result);
    };

    const eulaOperation: Observable<any> = this.homeService.getEULA(eulaSuccess);
  }

  onGetNotification(data) {
    console.log('Notification receieved', data);
  }
}
