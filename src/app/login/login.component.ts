import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastService } from '../services/toast.service';

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
  private toastService = inject(ToastService)

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  showToast(message: string, toastType: 'success' | 'danger' | 'warning') {
    this.toastService.show(message, {
      classname: `bg-${toastType} text-light`,
      delay: 5000,
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
              this.router.navigateByUrl('/dashboard');
              this.showToast('Login Success', 'success');
            },
          });
        },
        error: (err) => {
          this.errorMessage = err;
          console.dir('Error during login:', err);
          this.showToast(this.errorMessage.message, 'danger');
 
        },
      });
    } else {
      this.showToast('Invalid inputs', 'warning');
    }
  }
}
