import { Inject, Injectable, Component } from '@angular/core';
import { AngularFire, FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import {FcmNotificationConstatntService} from './fcm-notification-constant.service';

/**
 * 
 */
@Injectable()
export class FcmNotificationHandlerService {
private _messaging: firebase.messaging.Messaging;

  NOTIFICATION_EVENT = this.fcmNotificationConstatntService.
    FCM_NOTIFICATION_EVENT;
  private _isFCMInitialized: boolean = false;

  constructor(
    @Inject(FirebaseApp) private _firebaseApp: firebase.app.App,
    @Inject(FcmNotificationConstatntService) private fcmNotificationConstatntService
  ) { }

  /**
   * 
   */
  get isFCMInitialized() {
    return this._isFCMInitialized;
  }

  /**
   * 
   */
  deleteToken() {
    return this._messaging.getToken()
      .then(function (currentToken) {
        this.setFCMInitialize(false);
        return this._messaging.deleteToken(currentToken);
      })
      .catch(function (err) {
        console.log('Error retrieving Instance ID token. ', err);
        // showToken('Error retrieving Instance ID token. ', err);
      });
  };

  /**
   * 
   */
  initialiseFCM() {
    const event = document.createEvent('Event');

    this._messaging = firebase.messaging(this._firebaseApp);
    this._messaging.onMessage((data) => {this.onMessage(data)});
  }

  /**
   * 
   */
  requestNotificationPermission() {
    return this._messaging.requestPermission();
  }

  /**
   * 
   */
  getFCMToken() {
    this.setFCMInitialize(true);
    return this._messaging.getToken();
  }

  /**
   * 
   */
  setFCMInitialize(value) {
    this._isFCMInitialized = value;
  }

  /**
   * @param  {} payload
   */
  onMessage(payload) {
    console.log('Message received. ', payload);
    // TODO:From payload take event type and then dispatch it
    const event = new CustomEvent(
      this.NOTIFICATION_EVENT.NOTIFICATION_TYPE_TEST,
      {detail: payload}
    );
    document.dispatchEvent(event);
  };
}
