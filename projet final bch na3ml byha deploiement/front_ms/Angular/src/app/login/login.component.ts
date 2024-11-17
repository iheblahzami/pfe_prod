import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../services/AuthService";
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null; // Initialize errorMessage to null
  isLoggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    // Check if user is already logged in
    this.isLoggedIn = this.authService.isLoggedIn();

    // JavaScript code converted to TypeScript
    const body: HTMLElement | null = document.querySelector("body");
    const modal: HTMLElement | null = document.querySelector(".modal");
    const modalButton: HTMLElement | null = document.querySelector(".modal-button");
    const closeButton: HTMLElement | null = document.querySelector(".close-button");
    const scrollDown: HTMLElement | null = document.querySelector(".scroll-down");
    let isOpened: boolean = false;

    const openModal = () => {
      if (modal) {
        modal.classList.add("is-open");
      }
      if (body) {
        body.style.overflow = "hidden";
      }
    };

    const closeModal = () => {
      if (modal) {
        modal.classList.remove("is-open");
      }
      if (body) {
        body.style.overflow = "initial";
      }
    };

    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight / 3 && !isOpened) {
        isOpened = true;
        if (scrollDown) {
          scrollDown.style.display = "none";
        }
        openModal();
      }
    });

    if (modalButton) {
      modalButton.addEventListener("click", openModal);
    }

    if (closeButton) {
      closeButton.addEventListener("click", closeModal);
    }

    document.onkeydown = (evt: KeyboardEvent) => {
      evt = evt || window.event;
      evt.keyCode === 27 ? closeModal() : false;
    };

  }
















  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.login2(email, password); // Call login2 with email and password
  }

  login2(email: string, password: string): void {
    this.http.post(`${environment.config.urlLogin}/login`, { email, password })
      .pipe(
        map((response: any) => {
          // Check if the response contains a JWT token
          if (response && response.token) {
            // Store the JWT token in localStorage
            localStorage.setItem('jwt', response.token);
            // Optionally, you can store additional user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.user));
            this.isLoggedIn = true; // Set isLoggedIn to true after successful login
          }
        })
      )
      .subscribe(
        () => {
          console.log('Login successful'); // Handle successful login
          this.router.navigate(['/dash']);
        },
        (error: HttpErrorResponse) => {
          console.error('Login error:', error); // Handle login error
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password.';
          } else {
            this.errorMessage = 'An error occurred while logging in. Please try again later.';
          }
        }
      );
  }



}
