import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userFormGroup!: FormGroup;
  errorMessage!: any;

  private fb = inject(FormBuilder)
  private router = inject(Router)
  private authService = inject(AuthenticationService)

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  handleLogin() {
    if (this.userFormGroup.valid) {
      let email = this.userFormGroup.value.email;
      let password = this.userFormGroup.value.password;
      this.authService.login(email, password).subscribe({
        next: (appUser) => {
          this.authService.autheticateUser(appUser!).subscribe({
            next: (data) => {
              this.router.navigateByUrl('/accueil');
            },
          });
        },
        error: (err) => {
          this.errorMessage = err;
          console.dir('Error during login:', err);
 
        },
      });
    } else {
      console.dir('Error during login');
    }
  }
}
