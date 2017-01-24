import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Configuration } from '../app.constants';

import { DatatableService } from '../datatable/datatable.service';
import { UtilityService } from '../common/ts/utility.service';

@Component({
  selector: 'app-update-datatable',
  templateUrl: './update-datatable.component.html',
  styleUrls: ['./update-datatable.component.css']
})
export class UpdateDatatableComponent implements OnInit {

  // Variable Declarations
  name;
  email;
  age;
  city;
  oldData;

  constructor(
    private datatableService: DatatableService,
    private route: ActivatedRoute,
    private router: Router,
    private utilityService: UtilityService,
    private configuration: Configuration
  ) { }

  ngOnInit() {
    console.log('params: ',this.route.snapshot.params);
    this.oldData = this.route.snapshot.params;
    this.name = this.oldData.name;
    this.email = this.oldData.email;
    this.age = this.oldData.age;
    this.city = this.oldData.city;
  }

  updateData() {
    console.log('Executing : updateData()');
    var updatedData = {
      name: this.name,
      email: this.email,
      city: this.city,
      age: this.age
    };
    this.datatableService.updateData(this.oldData, updatedData);
    // this.router.navigate(['/datatable']);
    this.utilityService.navigateToState(this.configuration.STATES.datatable);
  }

}
