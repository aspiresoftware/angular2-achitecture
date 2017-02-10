import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NotificationSharedServiceService} from '../common/ts/shared-service/notification-shared-service.service';
import {Configuration} from '../app.constants';

/**
 *
 */
@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})

export class HamburgerComponent implements OnInit {

  notificationCount;
  states = this.configuration.STATES;

  constructor(
    private router: Router,
    private configuration: Configuration,
    private notificationSharedServiceService: NotificationSharedServiceService
  ) {
    // TODO: make one common code for route change
  }

  /**
   * @param  {} notificationCount
   */
  onUpdateNotification(notificationCount) {
    this.notificationCount = notificationCount;
  }

  ngOnInit() {
    this.notificationSharedServiceService.notificationAnnounced$
    .subscribe((notification) => {this.onUpdateNotification(notification); });
  }
}
