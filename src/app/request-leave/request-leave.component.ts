import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbDateStruct, NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-request-leave',
  standalone: true,
  imports: [
    DropdownComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgbTypeaheadModule,
    NgbDatepickerModule
  ],
  templateUrl: './request-leave.component.html',
  styleUrl: './request-leave.component.css',
})
export class RequestLeaveComponent implements OnInit {
  @Input() fromDate: NgbDateStruct | undefined;
  @Input() toDate: NgbDateStruct | undefined;
  minToDate: NgbDateStruct | undefined;

  @Output() dateRangeSelected = new EventEmitter<{
    from: NgbDateStruct;
    to: NgbDateStruct;
  }>();
  congesOptions = [
    'Congés maladie courte durée',
    'Congés maladie moyenne durée',
    'Congés maladie longue durée',
    'Congés de maternité',
    'Congés sans solde',
    'Congés de maternité',
    'Congés sans solde',
    'Congés annuels',
    'Congés exceptionnels',
    'Permission d’absence',
  ];

  departements: any[] = ['HR', 'IT', 'Management'];

  leaveRequestForm!: FormGroup;
  selectedFromDate: NgbDateStruct | undefined;
  selectedToDate: NgbDateStruct | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.leaveRequestForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      department: ['', Validators.required],
      leaveType: ['', Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
    }, {
      validators: this.dateRangeValidator
    });
  }
  private dateRangeValidator(formGroup: FormGroup) {
    const fromDate = formGroup.get('fromDate')?.value;
    const toDate = formGroup.get('toDate')?.value;

    if (fromDate && toDate && new Date(toDate.year, toDate.month - 1, toDate.day) < new Date(fromDate.year, fromDate.month - 1, fromDate.day)) {
      return { dateRangeInvalid: true };
    }
    return null;
  }


  searchConges = (text$: Observable<string>): Observable<string[]> =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.congesOptions
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  searchDepartments = (text$: Observable<string>): Observable<string[]> =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.departements
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );
    onFromDateChange(date: NgbDateStruct) {
      this.fromDate = date;
      this.leaveRequestForm.get('fromDate')?.setValue(date);
      this.leaveRequestForm.get('toDate')?.updateValueAndValidity();
      this.emitDateRange();
    }
  
    onToDateChange(date: NgbDateStruct) {
      this.toDate = date;
      this.leaveRequestForm.get('toDate')?.setValue(date);
      this.leaveRequestForm.get('fromDate')?.updateValueAndValidity();
      this.emitDateRange();
    }
  
    emitDateRange() {
      if (this.fromDate && this.toDate) {
        this.dateRangeSelected.emit({ from: this.fromDate, to: this.toDate });
      }
    }
    

  onSubmit() {
    if (this.leaveRequestForm.valid) {
      const formData = this.leaveRequestForm.value;
      console.log('Form Data: ', JSON.stringify(formData));
      //TO DO: Send formData to backend
    } else {
      console.log('Form is invalid');
      this.markAllAsTouched();
    }
  }

  markAllAsTouched() {
    Object.keys(this.leaveRequestForm.controls).forEach((controlName) => {
      this.leaveRequestForm.get(controlName)?.markAsTouched();
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.leaveRequestForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }

}