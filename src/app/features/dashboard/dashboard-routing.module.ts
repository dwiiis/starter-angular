import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/core/services/auth.guard';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: DashboardComponent }])],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
