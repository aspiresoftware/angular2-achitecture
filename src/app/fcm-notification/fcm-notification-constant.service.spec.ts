/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FcmNotificationConstatntService } from './fcm-notification-constatnt.service';

describe('FcmNotificationConstatntService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FcmNotificationConstatntService]
    });
  });

  it('should ...', inject([FcmNotificationConstatntService], (service: FcmNotificationConstatntService) => {
    expect(service).toBeTruthy();
  }));
});
