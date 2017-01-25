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
  }

  postData() {
    var newData = {
      name: this.name,
      email: this.email,
      city: this.city,
      age: this.age
    };
    this.data.push(newData);
    this.datatableService.postData(newData);
    this.clearData();
  }

  deleteData(name, email, age, city) {
    for(var i=0; i < this.data.length; i++) {
      if(this.data[i].name === name && this.data[i].email === email && this.data[i].age === age && this.data[i].city === city) {
        this.data.splice(i, 1);
      }
    }
    this.datatableService.deleteData(name, email, age, city);
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

}
