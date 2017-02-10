import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Configuration } from '../app.constants';

import { UsersService } from '../users/users.service';
import { UtilityService } from '../common/ts/utility.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  // Variable Declarations
  name;
  email;
  age;
  city;
  oldData;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private utilityService: UtilityService,
    private configuration: Configuration
  ) { }

  ngOnInit() {
    this.oldData = this.route.snapshot.params;
    this.name = this.oldData.name;
    this.email = this.oldData.email;
    this.age = this.oldData.age;
    this.city = this.oldData.city;
  }

  putData() {
    const updatedData = {
      name: this.name,
      email: this.email,
      city: this.city,
      age: this.age
    };
    this.usersService.putData(this.oldData, updatedData);
    // this.router.navigate(['/datatable']);
    this.utilityService.navigateToState(this.configuration.STATES.users);
  }

}
