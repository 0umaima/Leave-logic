import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { DepartementService } from '../services/departement.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employe-add.component.html',
  styleUrls: ['./employe-add.component.css'],
  standalone: true,
  imports: [RouterLink,NgFor, NgIf]
})
export class EmployeeComponent  {
  employeeForm!: FormGroup;
  newEmployee: any;
  submitted = false;
  show: boolean = false;
  departments: any[] | undefined;

  constructor(private formBuilder: FormBuilder,private employeservice :EmployeeService,private departmentService: DepartementService ) {
    this.employeeForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      solde: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motdepass: ['', Validators.required],
    });
    this.departmentService.getDepartment().subscribe(
      data => {
        this.departments = data;
      },
      error => {
        console.error('Error fetching departments');
      }
    );

  }
  ngOnInit(): void {}
  onSubmit(event: Event): void {

    if (this.employeeForm.invalid) {
      return; // Stop execution if form is invalid
    }

    const employee = this.employeeForm.value; // Directly access form values

    this.employeservice.addEmploye(employee).subscribe(response => {
      console.log('Response:', response);
    });

  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.employeeForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }

  formReset() {
    this.submitted = false;
    this.employeeForm.reset();
  }
}



