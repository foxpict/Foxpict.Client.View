import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  template: `
  <app-main-layout>
    <nb-menu [items]="menu"></nb-menu>
    <router-outlet></router-outlet>
  </app-main-layout>
  `
})
export class PagesComponent {
  menu: NbMenuItem[] = [
    {
      title: 'Preview',
      icon: 'nb-e-commerce',
      link: '/pages/album/preview',
      home: true,
    },
    {
      title: 'IoT Dashboard',
      icon: 'nb-home',
      link: '/pages/iot-dashboard',
    },
  ];
}
