import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RegisterModel } from '../common/models/registerModel.structure';
import { UserModel } from '../common/models/userModel.structure';
import { RegisterService } from './register.service';
import { UtilityService } from '../common/ts/utility.service';
import { Configuration } from '../app.constants';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})

export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public registerModel: RegisterModel;
  states = this.configuration.STATES;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private utilityService: UtilityService,
    private configuration: Configuration
  ) {
    this.registerForm = formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12)])],
      confirmPassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12)])]
    });
  }

  ngOnInit() {
  }

  public submitForm(value: any) {
    this.registerModel = new RegisterModel(
      value.email,
      value.password,
      value.confirmPassword
    );

    const registerSuccess = (user) => {
      console.log(user);
      this.utilityService.navigateToState(this.configuration.STATES.login);
    };

    let operation: Observable<UserModel[]> = this.registerService.registerUser(this.registerModel, registerSuccess);
  }

}
