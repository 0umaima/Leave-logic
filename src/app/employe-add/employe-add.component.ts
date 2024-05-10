import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employe-add.component.html',
  styleUrls: ['./employe-add.component.css'],
  standalone: true,
  imports: [RouterLink, NgIf]
})
export class EmployeeComponent  {
  employeeForm!: FormGroup;
  newEmployee: any;
  submitted = false;
  show: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      solde: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motdepass: ['', Validators.required],
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



