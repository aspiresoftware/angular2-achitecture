/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FcmInitializerService } from './fcm-initializer.service';

describe('FcmInitializerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FcmInitializerService]
    });
  });

  it('should ...', inject([FcmInitializerService], (service: FcmInitializerService) => {
    expect(service).toBeTruthy();
  }));
});
