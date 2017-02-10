import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

/**
 * User service
 */
@Injectable()
export class UsersService {

  constructor(
    private http: Http
  ) { }

  /**
   * Get data
   */
  getData() {
    const data = JSON.parse(localStorage.getItem('data'));

    if (data === null || data.length <= 0) {
      return [];
    } else {
      return data;
    }
  }

  getDummyData() {
    return this.http.get('app/data.json')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * Add user
   */
  postData(newData) {
    let data = JSON.parse(localStorage.getItem('data'));

    if (data === null) {
      data = [];
    }

    data.push(newData);
    localStorage.setItem('data', JSON.stringify(data));
  }

  /**
   * Remove user
   */
  deleteData(name, email, age, city) {
    const data = JSON.parse(localStorage.getItem('data'));

    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name && data[i].email === email && data[i].age === age && data[i].city === city) {
        data.splice(i, 1);
      }
    }

    localStorage.setItem('data', JSON.stringify(data));
  }

  /**
   * Edit user
   */
  putData(oldData, updatedData) {
    const data = JSON.parse(localStorage.getItem('data'));
    const oldDataAge = Number(oldData.age);
    const updatedDataAge = Number(updatedData.age);
    updatedData.age = updatedDataAge;

    for (let i = 0; i < data.length; i++) {
      if (data[i].name === oldData.name && data[i].email === oldData.email && data[i].age === oldDataAge && data[i].city === oldData.city) {
        data[i] = updatedData;
      }
    }

    localStorage.setItem('data', JSON.stringify(data));
  }

}
