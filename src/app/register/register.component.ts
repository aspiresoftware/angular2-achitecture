import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RegisterModel } from '../common/models/registerModel.structure';
import { UserModel } from '../common/models/userModel.structure';
import { RegisterService } from './register.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {
    this.registerForm = formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12)])],
      confirmPassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12)])]
    });
  }

  ngOnInit() {
  }

  public submitForm(value: any){
    this.registerModel = new RegisterModel(
      value.email,
      value.password,
      value.confirmPassword
    );
    
    let operation:Observable<UserModel[]> = this.registerService.registerUser(this.registerModel);
    operation.subscribe(
      (user) => {
          console.log(user);
          let user1 = user;
      }, 
      err => {
          console.log(err);
      });
  }

}
