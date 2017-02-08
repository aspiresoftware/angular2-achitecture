/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IsAlreadyLoggedinService } from './is-already-loggedin.service';

describe('IsAlreadyLoggedinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAlreadyLoggedinService]
    });
  });

  it('should ...', inject([IsAlreadyLoggedinService], (service: IsAlreadyLoggedinService) => {
    expect(service).toBeTruthy();
  }));
});
