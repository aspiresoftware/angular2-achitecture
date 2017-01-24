import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable()
export class UtilityService {

  constructor(
    private _router: Router
  ) {}

  public navigateToState(state) {
    this._router.navigate([state]);
  }
}
