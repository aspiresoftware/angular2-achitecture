/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventListenerService } from './event-listener.service';

describe('EventListenerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventListenerService]
    });
  });

  it('should ...', inject([EventListenerService], (service: EventListenerService) => {
    expect(service).toBeTruthy();
  }));
});
