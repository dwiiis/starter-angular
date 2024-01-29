import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from 'src/app/core/models/interfaces/breadcrumb';
import { Users } from 'src/app/core/models/interfaces/users';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-demo-detail',
  templateUrl: './demo-detail.component.html',
})
export class DemoDetailComponent implements OnInit {
  breadcrumbs: Breadcrumb;
  user: Users;
  userId: number;

  constructor(private router: Router, private userSv: UserService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.breadcrumbs = {
      list: [
        {
          label: 'Dashboard',
          link: '/',
        },
        {
          label: 'Demo',
          link: '/demo',
        },
        {
          label: 'Demo Detail',
          link: '/demo/detail',
        },
      ],
    };

    this.activeRoute.queryParams.subscribe((params) => {
      this.userId = Number(params['id']);
    });

    this.getDetailUser();
  }

  getDetailUser() {
    this.userSv.getUserDetail(2).subscribe({
      next: (data) => {
        this.user = data.data;
      },
    });
  }
  goToBack() {
    this.router.navigate(['/demo']);
  }
}
