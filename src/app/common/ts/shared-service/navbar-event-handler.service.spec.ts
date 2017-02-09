/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NavbarEventHandlerService } from './navbar-event-handler.service';

describe('NavbarEventHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavbarEventHandlerService]
    });
  });

  it('should ...', inject([NavbarEventHandlerService], (service: NavbarEventHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
