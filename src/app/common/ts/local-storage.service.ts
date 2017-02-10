import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public storage = {
    user: {},
    auth: {}
  };
  private isStorage = false;

  constructor() {
  }

  public create() {
    localStorage.setItem('auth', JSON.stringify(this.storage.auth));
    localStorage.setItem('user', JSON.stringify(this.storage.user));
    this.isStorage = true;
    return localStorage;
  }

  public setValue(key, value) {
    const objectKey = this.storageForKey(key);
    if (typeof (value) !== 'boolean') {
      this.storage[objectKey][key] = window.btoa(value);
    } else {
      this.storage[objectKey][key] = value;
    }
    localStorage.setItem(objectKey, JSON.stringify(this.storage[objectKey]));
  }

  public getValue(key): any {
    // let value = this.storage[objectKey][key].getitem();
    if (this.isLocalStorage()) {
      const objectKey = this.storageForKey(key);
      const value = JSON.parse(localStorage[objectKey])[key];
      if (typeof(value) !== 'boolean'){
        return window.atob(JSON.parse(localStorage[objectKey])[key]);
      } else {
        return value;
      }
    } else {
      return;
    }
  }

  public isLocalStorage() {
    return this.isStorage;
  }

  private storageForKey(key) {
    switch (key) {
      case 'accessToken':
        return 'auth';
      case 'refreshToken':
        return 'auth';
      default:
        return 'user';
    }
  }
}
