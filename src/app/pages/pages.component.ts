import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
  <app-main-layout>
    <router-outlet></router-outlet>
  </app-main-layout>
  `,
})
export class PagesComponent {

}
