import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isNavbarOpen = false;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  scroll(anchor: string) {
    const element = this.document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
