import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { TokenGuard } from 'src/app/core/services/token.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginComponent,canActivate: [TokenGuard] }
    ])],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
