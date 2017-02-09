/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InfiniteScrollService } from './infinite-scroll.service';

describe('InfiniteScrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfiniteScrollService]
    });
  });

  it('should ...', inject([InfiniteScrollService], (service: InfiniteScrollService) => {
    expect(service).toBeTruthy();
  }));
});
