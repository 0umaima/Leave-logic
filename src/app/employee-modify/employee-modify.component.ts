import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-modify',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './employee-modify.component.html',
  styleUrl: './employee-modify.component.css'
})
export class EmployeeModifyComponent {
  employeeForm!: FormGroup;
  newEmployee: any;
  submitted = false;
  show: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      email: ['', Validators.email]

    });
  }

  onSubmit() {
    this.employeeForm.markAllAsTouched();
    this.submitted = true;
    this.newEmployee = this.employeeForm.value;
    if (this.employeeForm.valid && this.submitted) {
      alert('Le formulaire a été soumis avec succès!');
    }  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.employeeForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }

  formReset() {
    this.submitted = false;
    this.employeeForm.reset();
  }
}
