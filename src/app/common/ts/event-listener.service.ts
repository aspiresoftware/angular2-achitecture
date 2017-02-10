import { Injectable } from '@angular/core';

/**
 * 
 */
@Injectable()
export class EventListenerService {

  constructor() { }

  /**
   * @param  {} eventType
   * @param  {} successCallBack
   */
  onEvent(eventType, successCallBack) {
        document.addEventListener(eventType, successCallBack, false);
  }
}
