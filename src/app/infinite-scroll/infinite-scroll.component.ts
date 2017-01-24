import { Component, OnInit } from '@angular/core';
import { InfiniteScrollService } from './infinite-scroll.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit {

  // Variable Declarations
  result;
  data;
  count;
  page = 1;
  pagesize = 10;

  constructor(
    private infiniteScrollService: InfiniteScrollService
  ) { }

  ngOnInit() {
    this.infiniteScrollService.getData().subscribe(
      res => {
        this.result = res;
        // localStorage.setItem('data', JSON.stringify(this.data));
        console.log('Data Added');
        this.data = this.result.splice(this.page, 20);
        this.count = this.data.length;
      },
      err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  getMoreData() {
    console.log('Executing : getMoreData()');
    this.page += 1;
    var start = this.page * 10;
    var moreData = this.result.splice(start, this.pagesize);
    this.data.push(moreData);
    this.count = this.data.length;
  }

}
