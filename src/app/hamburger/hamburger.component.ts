import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent implements OnInit {

  showNavBar: boolean = false;

  constructor(
    private navbarService: NavbarService,
    private router: Router
  ) {

    router.events.subscribe((url: any) => {
      if (localStorage.getItem('auth') && localStorage.getItem('user')) {
        // logged in so true
        if (url.url === '/login' || url.url === '/register') {
          this.navbarService.showNavBar(false);
        } else {
          this.navbarService.showNavBar(true);
        }
      }
    });

    this.navbarService.showNavBarEmitter.subscribe((mode) => {
      // mode will be null the first time it is created, so you need to igonore it when null
      if (mode !== null) {
        this.showNavBar = mode;
      }
    });
  }

  ngOnInit() { }

}
