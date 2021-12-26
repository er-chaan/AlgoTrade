import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-auth',
  template: `
  <ngx-zero-column-layout>
    <router-outlet></router-outlet>
  </ngx-zero-column-layout>
  `,
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}



