import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Breadcrumb } from 'src/app/core/models/interfaces/breadcrumb';

@Component({
  selector: 'app-demo-add',
  templateUrl: './demo-add.component.html',
})
export class DemoAddComponent implements OnInit {
  breadcrumbs: Breadcrumb;
  cities: any[] | undefined;
  formGroup: FormGroup | undefined;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formGroup = this.fb.group({
      username: [, Validators.required],
      role: [],
      pic: [],
      description: [],
      email: [],
      phoneNumber: [],
    });
  }

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
          label: 'Demo Add',
          link: '/demo/add',
        },
      ],
    };
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const input = event.key;
    if (!/^[0-9\b]+$/.test(input)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    console.log('SUBMITTED: ', this.formGroup.value);
  }
  goToBack() {
    this.router.navigate(['/demo']);
  }
}
