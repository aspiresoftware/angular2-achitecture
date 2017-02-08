import { Injectable, Inject } from '@angular/core';
import {FcmNotificationHandlerService} from '../../fcm-notification/fcm-notification-handler.service';

@Injectable()
export class FcmInitializerService {

  constructor(@Inject(FcmNotificationHandlerService) private fcmNotificationHandlerService) { }

  initialiseAppForFcm() {
    this.fcmNotificationHandlerService.initialiseFCM();
    this.fcmNotificationHandlerService.requestNotificationPermission().then(() => {
      this.fcmNotificationHandlerService.getFCMToken().then((data) => {this.onGetTokenSuccess(data)})
    });
  }

  onGetTokenSuccess(token) {
    if (token) {
      console.log('get token success', token);
    }
  }

}
