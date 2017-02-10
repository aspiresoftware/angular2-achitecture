/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthRefresherService } from './auth-refresher.service';

describe('AuthRefresherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRefresherService]
    });
  });

  it('should ...', inject([AuthRefresherService], (service: AuthRefresherService) => {
    expect(service).toBeTruthy();
  }));
});
