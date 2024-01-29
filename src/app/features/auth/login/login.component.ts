import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { LayoutService } from '../../layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isLoggedIn = false;
  isLoading = false;
  loginForm: FormGroup;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // init login form
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const credentials = this.loginForm.value;
    this.isLoading = true;
    this.authService.login(credentials).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.token);
        this.router.navigate(['/']);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully login',
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.log('ERR: ', err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong !',
        });
        this.isLoading = false;
      },
    });
  }

  showToast() {}
}
