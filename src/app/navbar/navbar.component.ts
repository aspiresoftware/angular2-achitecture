import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showNavBar: boolean = false;

  constructor(
    private navbarService: NavbarService
  ) {
    this.navbarService.showNavBarEmitter.subscribe((mode) => {
      // mode will be null the first time it is created, so you need to igonore it when null
      if (mode !== null) {
        this.showNavBar = mode;
      }
    });
  }

  ngOnInit() { }

}
