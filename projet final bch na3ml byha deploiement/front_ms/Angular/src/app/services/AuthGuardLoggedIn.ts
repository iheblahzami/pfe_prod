import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedIn implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      // User is not logged in, redirect them to the login page
      this.router.navigate([''], { replaceUrl: true, skipLocationChange: true });   // path to login
      return false;
    }
    return true;
  }
}
