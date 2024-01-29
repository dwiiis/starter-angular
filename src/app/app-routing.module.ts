import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './features/layout/app.layout.component';
import { AuthGuard } from './core/services/auth.guard';
import { NotFoundComponent } from './features/not-found/not-found.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppLayoutComponent,
          children: [
            { path: '', loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule) },
            { path: 'demo', loadChildren: () => import('./features/demo/demo.module').then((m) => m.DemoModule) },
          ],
          canActivate: [AuthGuard],
        },
        { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule) },
        { path: 'notfound', component: NotFoundComponent },
        { path: '**', redirectTo: '/notfound' },
      ],
      { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
