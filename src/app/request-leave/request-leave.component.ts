import { Component } from '@angular/core';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DateRangePickerComponent } from '../shared/date-range-picker/date-range-picker.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-request-leave',
  standalone: true,
  imports: [
    DropdownComponent,
    FormsModule,
    DateRangePickerComponent,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './request-leave.component.html',
  styleUrl: './request-leave.component.css',
})
export class RequestLeaveComponent {
  congesAdministratifsOptions = [
    { label: 'Congés annuels', value: 'Conges annuels' },
    { label: 'Congés exceptionnels', value: 'Conges exceptionnels' },
    { label: 'Permission d’absence', value: 'Permission d’absence' },
  ];
  congesMaladieOptions = [
    {
      label: 'Congés maladie courte durée',
      value: 'Conges maladie courte durée',
    },
    {
      label: 'Congés maladie moyenne durée',
      value: 'Conges maladie moyenne durée',
    },
    {
      label: 'Congés maladie longue durée',
      value: 'Conges maladie longue durée',
    },
  ];

  autresOptions = [
    { label: 'Congés de maternité', value: 'Congés de maternité' },
    { label: 'Congés sans solde', value: 'Congés sans solde' },
  ];

  departements = [
    { label: 'HR', value: 'HR' },
    { label: 'IT', value: 'IT' },
    { label: 'Finance', value: 'FINANCE' },
  ];

  leaveRequestForm!: FormGroup;

  selectedOption: string = '';
  choosenValue: string = '';
  dropdownButtonText = 'Liste des départements';
  selectedFromDate: NgbDateStruct | undefined;
  selectedToDate: NgbDateStruct | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.leaveRequestForm = this.fb.group({
      fullName: ['', Validators.required],
      department: ['', Validators.required],
      leaveType: ['', Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
    });
  }
  handleDepartmentSelection(selectedValue: string): void {
    const selectedDepartment = this.departements.find(
      (dept) => dept.value === selectedValue
    );

    if (selectedDepartment) {
      this.dropdownButtonText = selectedDepartment.label;
    } else {
      this.dropdownButtonText = 'Select Department';
    }

    this.leaveRequestForm.patchValue({ department: selectedValue });
  }

  handleDropdownSelection(selectedValue: any): void {
    this.selectedOption = selectedValue;
    this.leaveRequestForm.patchValue({ leaveType: selectedValue });
  }

  handleDateRangeSelection(dateRange: {
    from: NgbDateStruct;
    to: NgbDateStruct;
  }) : void {
    this.leaveRequestForm.patchValue({ dateRange });
  }

  onSubmit() {
    if (this.leaveRequestForm.valid) {
      const formData = this.leaveRequestForm.value;
      console.log('Form Data: ', JSON.stringify(formData));
      // Send formData to backend
    } else {
      console.log('Form is invalid');
      this.markAllAsTouched();
      this.leaveRequestForm.markAllAsTouched();
    }
  }

  markAllAsTouched() {
    Object.keys(this.leaveRequestForm.controls).forEach((controlName) => {
      this.leaveRequestForm.get(controlName)?.markAsTouched();
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.leaveRequestForm.get(controlName);
    return control
      ? control.hasError(errorName) && (control.dirty || control.touched)
      : false;
  }
}
