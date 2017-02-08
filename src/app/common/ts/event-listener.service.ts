import { Injectable } from '@angular/core';

@Injectable()
export class EventListenerService {

  constructor() { }

  onEvent(eventType, successCallBack) {
        document.addEventListener(eventType, successCallBack, false);
  }
}
