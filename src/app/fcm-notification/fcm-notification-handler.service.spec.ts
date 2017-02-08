/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FcmNotificationHandlerService } from './fcm-notification-handler.service';

describe('FcmNotificationHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FcmNotificationHandlerService]
    });
  });

  it('should ...', inject([FcmNotificationHandlerService], (service: FcmNotificationHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
