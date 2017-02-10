import { Injectable } from '@angular/core';

/**
 *
 */
@Injectable()
export class LocalStorageService {

  public storage = {
    user: {},
    auth: {}
  };

  constructor() {}

  /**
   * Creates localstorage
   */
  public create() {
    localStorage.setItem('auth', JSON.stringify(this.storage.auth));
    localStorage.setItem('user', JSON.stringify(this.storage.user));
    return localStorage;
  }

  /**
   * Set value to localstorage
   *
   * @param  {} key
   * @param  {} value
   */
  public setValue(key, value) {
    const objectKey = this.storageForKey(key);
    if (typeof (value) !== 'boolean') {
      this.storage[objectKey][key] = window.btoa(value);
    } else {
      this.storage[objectKey][key] = value;
    }
    localStorage.setItem(objectKey, JSON.stringify(this.storage[objectKey]));
  }

  /**
   * Get value from localstorage
   *
   * @param  {} key
   * @returns any
   */
  public getValue(key): any {
    // let value = this.storage[objectKey][key].getitem();
    if (this.isLoggedIn) {
      const objectKey = this.storageForKey(key);
      const value = JSON.parse(localStorage[objectKey])[key];
      if (typeof(value) !== 'boolean') {
        return window.atob(JSON.parse(localStorage[objectKey])[key]);
      } else {
        return value;
      }
    } else {
      return;
    }
  }

  /**
   * Check if localsorage is created or not
   */
  get isLoggedIn() {
    return window.localStorage.getItem('auth');
  }

  /**
   * Identify key of localstorage
   *
   * @param  {} key
   */
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
