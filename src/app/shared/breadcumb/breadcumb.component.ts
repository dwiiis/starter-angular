import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from 'src/app/core/models/interfaces/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcumb.component.html',
  styleUrl: './breadcumb.component.scss',
})
export class BreadcumbComponent {
  @Input() breadcrumbs: Breadcrumb;
  constructor(private router: Router){

  }
  goToPage(link: string){
    this.router.navigate([link]);
  }
}
