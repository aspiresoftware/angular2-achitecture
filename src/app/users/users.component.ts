import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import {NavbarEventHandlerService} from '../common/ts/shared-service/navbar-event-handler.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // letiable Declarations
  data;
  name;
  email;
  age;
  city;
  mobileData;
  count = 0;
  page = 0;
  pagesize = 10;
  windowWidth;
  // Modal letiable Declarations
  visible = false;
  visibleAnimate = false;

  constructor(
    private usersService: UsersService,
    private navbarEventHandlerService: NavbarEventHandlerService
  ) {
    this.navbarEventHandlerService.navbarEventAnnounced$
    .subscribe((data) => {this.onNavbarEvent(data); });
  }

  onNavbarEvent(data) {
    switch (data.eventType) {
      case  'showModalEvent':
        this.showModal(data);
        break;
    }
  }

  ngOnInit() {
    this.data = this.usersService.getData();
    if (this.data.length <= 0) {
      this.usersService.getDummyData().subscribe(
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
    const newData = {
      name: this.name,
      email: this.email,
      city: this.city,
      age: this.age
    };
    this.data.push(newData);
    this.mobileData.push(newData);
    this.usersService.postData(newData);
    this.clearData();
    this.count = this.mobileData.length;
  }

  deleteData(name, email, age, city) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].name === name && this.data[i].email === email && this.data[i].age === age && this.data[i].city === city) {
        this.data.splice(i, 1);
        this.mobileData.splice(i, 1);
      }
    }
    this.usersService.deleteData(name, email, age, city);
    this.count = this.mobileData.length;
  }

  clearData() {
    this.name = '';
    this.email = '';
    this.city = '';
    this.age = '';
    // handle hideModal() letiables
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  showModal(data) {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  // hideModal() {
  //   this.visibleAnimate = false;
  //   setTimeout(() => this.visible = false, 300);
  // }

  getMoreData() {
    this.page += 1;
    const start = this.page * this.pagesize;
    const end = (this.page + 1) * this.pagesize;
    const moreData = this.data.slice(start, end);
    this.mobileData = this.mobileData.concat(moreData);
    this.count = this.mobileData.length;
  }

  // @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

}
