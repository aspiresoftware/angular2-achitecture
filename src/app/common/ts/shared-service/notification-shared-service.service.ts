import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * 
 */
@Injectable()
export class NotificationSharedServiceService {

  // Observable string sources
  private notificationAnnouncedSource = new Subject();

  notificationAnnounced$ = this.notificationAnnouncedSource.asObservable();

  /**
   * @param  {} notification
   */
  announceNotification(notification) {
    this.notificationAnnouncedSource.next(notification);
  }

}
