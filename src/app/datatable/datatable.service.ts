import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DatatableService {

  constructor(private http:Http) {
    console.log('Executing : DatatableService');
  }

  getData() {
    console.log('Executing : getDataService');
    
    var data = JSON.parse(localStorage.getItem('data'));

    console.log('data: ',data);

    if (data === null || data.length <= 0) {
      console.log('No data found');
      return [];
    } else {
      console.log('Found Data.');
      return data;
    }
  }

  getDummyData() {
    console.log('Executing : getDummyDataService');

    return this.http.get('app/data.json')
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  addData(newData) {
    console.log('Executing : addDataService');
    var data = JSON.parse(localStorage.getItem('data'));

    if (data === null) {
      data = [];
    }

    data.push(newData);
    localStorage.setItem('data', JSON.stringify(data));
  }

  deleteData(name, email, age, city) {
    console.log('Executing : deleteDataService');
    var data = JSON.parse(localStorage.getItem('data'));

    for(var i=0; i < data.length; i++) {
      if(data[i].name === name && data[i].email === email && data[i].age === age && data[i].city === city) {
        data.splice(i, 1);
      }
    }
    
    localStorage.setItem('data', JSON.stringify(data));
  }

  updateData(oldData, updatedData) {
    console.log('Executing : updateDataService');
    var data = JSON.parse(localStorage.getItem('data'));
    var oldDataAge = Number(oldData.age);
    var updatedDataAge = Number(updatedData.age);
    updatedData.age = updatedDataAge;

    for(var i=0; i < data.length; i++) {
      if(data[i].name === oldData.name && data[i].email === oldData.email && data[i].age === oldDataAge && data[i].city === oldData.city) {
        data[i] = updatedData;
      }
    }

    localStorage.setItem('data', JSON.stringify(data));
  }

}
