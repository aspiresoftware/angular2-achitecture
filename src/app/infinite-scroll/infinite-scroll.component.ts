import { Component, OnInit } from '@angular/core';
import { InfiniteScrollService } from './infinite-scroll.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit {

  // Variable Declarations
  currentPage;
  hasNext;
  hasPrevious;
  pages;
  data;
  count = 0;
  page = 1;

  constructor(
    private infiniteScrollService: InfiniteScrollService
  ) { }

  ngOnInit() {
    const operation = this.infiniteScrollService.getData(this.page);
    operation.subscribe(
      (res) => {
          this.currentPage = res.currentPage;
          this.hasNext = res.hasNext;
          this.hasPrevious = res.hasPrevious;
          this.pages = res.pages;
          this.data = res.services;
          this.count = this.data.length;
      },
      err => {
          console.log(err);
      }
    );
  }

  getMoreData() {
    if (this.hasNext) {
      this.page += 1;
      const operation = this.infiniteScrollService.getData(this.page);
      operation.subscribe(
        (res) => {
            this.currentPage = res.currentPage;
            this.hasNext = res.hasNext;
            this.hasPrevious = res.hasPrevious;
            this.pages = res.pages;
            this.data = this.data.concat(res.services);
            this.count = this.data.length;
        },
        err => {
            console.log(err);
        }
      );
    }
  }

}
