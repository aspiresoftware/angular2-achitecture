import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FcmNotificationHandlerService} from './fcm-notification-handler.service';
import {FcmNotificationConstatntService} from './fcm-notification-constant.service';
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDmutGG1GBJCYziGaUvH_HGR_D6ZFxCz7I',
  authDomain: 'angular2-test-bae21.firebaseapp.com',
  databaseURL: 'https://angular2-test-bae21.firebaseio.com',
  storageBucket: 'angular2-test-bae21.appspot.com',
  messagingSenderId: '793599214386'
};


@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [],
  providers: [FcmNotificationHandlerService,
  FcmNotificationConstatntService]
})
export class FcmNotificationModule { }
