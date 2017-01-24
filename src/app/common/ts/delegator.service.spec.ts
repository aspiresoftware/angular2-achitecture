/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DelegatorService } from './delegator.service';

describe('DelegatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DelegatorService]
    });
  });

  it('should ...', inject([DelegatorService], (service: DelegatorService) => {
    expect(service).toBeTruthy();
  }));
});
