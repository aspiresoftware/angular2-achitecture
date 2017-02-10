import { Component, OnInit } from '@angular/core';
import { ServicesListService } from './serviceslist.service';
import { UtilityService } from '../common/ts/utility.service';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-serviceslist',
  templateUrl: './serviceslist.component.html',
  styleUrls: ['./serviceslist.component.scss']
})
export class ServicesListComponent implements OnInit {

  // Variable Declarations
  currentPage;
  hasNext;
  hasPrevious;
  pages;
  data;
  count = 0;
  page = 1;

  constructor(
    private infiniteScrollService: ServicesListService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    const operation: Observable<any>  = this.infiniteScrollService.getData(this.page);
    const success = (res) => {
      this.currentPage = res.currentPage;
      this.hasNext = res.hasNext;
      this.hasPrevious = res.hasPrevious;
      this.pages = res.pages;
      this.data = res.services;
      this.count = this.data.length;
    };
    this.utilityService.handleRespone(operation, success);

  }

  getMoreData() {
    if (this.hasNext) {
      this.page += 1;
      const operation: Observable<any> = this.infiniteScrollService.getData(this.page);
      const success = (res) => {
        this.currentPage = res.currentPage;
        this.hasNext = res.hasNext;
        this.hasPrevious = res.hasPrevious;
        this.pages = res.pages;
        this.data = this.data.concat(res.services);
        this.count = this.data.length;
      };
      this.utilityService.handleRespone(operation, success);
    }
  }

}
