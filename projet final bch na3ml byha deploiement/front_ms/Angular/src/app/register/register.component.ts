import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../services/AuthService";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

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
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/login']); // Navigate to login page after successful registration
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = error.error.message || 'An error occurred while registering.';
      }
    );
  }
}
