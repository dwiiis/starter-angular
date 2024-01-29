import { Injectable } from '@angular/core';
import { Constant } from '../models/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(Constant.AUTH.TOKEN_KEY);
    localStorage.setItem(Constant.AUTH.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(Constant.AUTH.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(Constant.AUTH.USER_KEY);
    localStorage.setItem(Constant.AUTH.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(Constant.AUTH.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(Constant.AUTH.TOKEN_KEY);
    return !!token;
  }
}
