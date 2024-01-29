import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoComponent } from './demo.component';
import { DemoAddComponent } from './demo-add/demo-add.component';
import { DemoDetailComponent } from './demo-detail/demo-detail.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', component: DemoComponent },
      { path: 'add', component: DemoAddComponent },
      { path: 'detail', component: DemoDetailComponent },
    ]),
  ],
})
export class DemoRoutingModule {}
