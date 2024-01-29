import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        items: [
          {
            label: 'Dashboard',
            icon: {
              type: 'custom',
              source: 'assets/images/icons/house.svg',
            },
            routerLink: ['/'],
          },
          {
            label: 'Demo Page',
            icon: {
              type: 'default',
              source: 'pi pi-info-circle',
            },
            routerLink: ['/demo'],
          },
        ],
      },
    ];
  }
}
