/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatatableService } from './datatable.service';

describe('DatatableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatatableService]
    });
  });

  it('should ...', inject([DatatableService], (service: DatatableService) => {
    expect(service).toBeTruthy();
  }));
});
