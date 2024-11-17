import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {User} from "../models/Uses";
import { catchError } from 'rxjs/operators';
import {environment} from "../../environments/environment";
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://40.78.54.18:8005';
 //  private baseUrl = 'http://127.0.0.1:8005';

  constructor(private http: HttpClient,private router: Router) { }

  login(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }



  // login2(email: string, password: string): void {
  //   this.http.post(`${environment.config.urlLogin}/api/login_check`, { email, password })
  //     .pipe(
  //       map(response => {
  //         // login successful if there's a jwt token in the response
  //         if (response) {
  //           localStorage.setItem('jwt', JSON.stringify(response));
  //         }
  //       })
  //     );
  // }
  isLoggedIn(): boolean {
    // Check if JWT token is present in localStorage
    return !!localStorage.getItem('jwt');
  }

  logout(): void {
    localStorage.removeItem('jwt');
    // Optionally, you can clear other user-related data from localStorage
    localStorage.removeItem('user');
    this.router.navigate([''], { replaceUrl: true, skipLocationChange: true }); // path to login also
  }


  register(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, credentials).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
