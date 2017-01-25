import { Component, OnInit } from '@angular/core';
import { DatatableService } from './datatable.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  // Variable Declarations
  data;
  name;
  email;
  age;
  city;
  mobileData;
  count;
  page = 0;
  pagesize = 10;
  windowWidth;
  // Modal Variable Declarations
  visible = false;
  visibleAnimate = false;

  constructor(
    private datatableService: DatatableService
  ) { }

  ngOnInit() {
    this.data = this.datatableService.getData();
    if(this.data.length <= 0) {
      this.datatableService.getDummyData().subscribe(
        res => {
          this.data = res;
          localStorage.setItem('data', JSON.stringify(this.data));
        },
        err => {
          // Log errors if any
          console.log(err);
        }
      );
    }
    this.mobileData = this.data.slice(this.page, this.pagesize);
    this.count = this.mobileData.length;
    this.windowWidth = window.innerWidth;
  }

  postData() {
    var newData = {
      name: this.name,
      email: this.email,
      city: this.city,
      age: this.age
    };
    this.data.push(newData);
    this.mobileData.push(newData);
    this.datatableService.postData(newData);
    this.clearData();
    this.count = this.mobileData.length;
  }

  deleteData(name, email, age, city) {
    for(var i=0; i < this.data.length; i++) {
      if(this.data[i].name === name && this.data[i].email === email && this.data[i].age === age && this.data[i].city === city) {
        this.data.splice(i, 1);
        this.mobileData.splice(i, 1);
      }
    }
    this.datatableService.deleteData(name, email, age, city);
    this.count = this.mobileData.length;
  }

  clearData() {
    this.name = '';
    this.email = '';
    this.city = '';
    this.age = '';
    // handle hideModal() variables 
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  showModal() {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  // hideModal() {
  //   this.visibleAnimate = false;
  //   setTimeout(() => this.visible = false, 300);
  // }

  getMoreData() {
    this.page += 1;
    var start = this.page * this.pagesize;
    var end = (this.page + 1) * this.pagesize;
    var moreData = this.data.slice(start, end);
    this.mobileData = this.mobileData.concat(moreData);
    this.count = this.mobileData.length;
  }

  // @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

}
