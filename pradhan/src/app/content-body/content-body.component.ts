import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-body',
  templateUrl: './content-body.component.html',
  styleUrls: ['./content-body.component.css'],
})
export class ContentBodyComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  // content-body.component.ts
  goToPage(page: string, event: Event) {
    event.preventDefault();
    console.log(`Navigating to: ${page}`);
    this.router.navigate([`/${page}`]);
  }
}