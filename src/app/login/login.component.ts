import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Configuration } from '../app.constants';

import { LoginModel } from '../common/models/loginModel.structure';
import { UserModel } from '../common/models/userModel.structure';

import { LoginService } from './login.service';
import { LocalStorageService } from '../common/ts/local-storage.service';
import { UtilityService } from '../common/ts/utility.service';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginModel: LoginModel;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService,
    private configuration: Configuration
  ) {
    this.loginForm = formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12)])]
    });
  }

  ngOnInit() {
  }

  submitForm(value: any) {
    this.loginModel = new LoginModel(
      value.email,
      value.password,
      'password'
    );

    let operation:Observable<any> = this.loginService.authenticateUser(this.loginModel);
    operation.subscribe(
      (result) => {
          console.log(result);
          let auth = result.auth;
          let user = result.user;

          this.localStorageService.create();
          this.localStorageService.setValue('id', user.id);
          this.localStorageService.setValue('email', user.email);
          this.localStorageService.setValue('accessToken', auth.accessToken);
          this.localStorageService.setValue('refreshToken', auth.refreshToken);

          this.utilityService.navigateToState(this.configuration.STATES.home);
      }, 
      err => {
          console.log(err);
      });
  }
}