import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(private tokenService: TokenStorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}