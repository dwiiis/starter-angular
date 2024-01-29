import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from './shared/shared.module';
import { AppLayoutModule } from './features/layout/app.layout.module';
import { authInterceptorProviders } from './core/services/auth.interceptor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, AppLayoutModule, ReactiveFormsModule, ToastModule, SharedModule, ConfirmDialogModule ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, MessageService, authInterceptorProviders, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
