/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationSharedServiceService } from './notification-shared-service.service';

describe('NotificationSharedServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationSharedServiceService]
    });
  });

  it('should ...', inject([NotificationSharedServiceService], (service: NotificationSharedServiceService) => {
    expect(service).toBeTruthy();
  }));
});
