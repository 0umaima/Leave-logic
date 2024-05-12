import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerComponent),
      multi: true
    }
  ],
  imports: [NgbDatepickerModule, FormsModule]
})
export class DateRangePickerComponent {
  @Input() fromDate: NgbDateStruct | undefined;
  @Input() toDate: NgbDateStruct | undefined;

  @Output() dateRangeSelected = new EventEmitter<{ from: NgbDateStruct, to: NgbDateStruct }>();

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  onFromDateChange(date: NgbDateStruct) {
    this.fromDate = date;
    this.emitDateRange();
  }

  onToDateChange(date: NgbDateStruct) {
    this.toDate = date;
    this.emitDateRange();
  }

  emitDateRange() {
    if (this.fromDate && this.toDate) {
      this.dateRangeSelected.emit({ from: this.fromDate, to: this.toDate });
      this.onChange({ from: this.fromDate, to: this.toDate });
      this.onTouched();
    }
  }

  disableBeforeFromDate(date: NgbDateStruct): boolean {
    if (!this.fromDate) {
      return false;
    }
    const from = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    const current = new Date(date.year, date.month - 1, date.day);
    return current < from;
  }

  writeValue(value: { from: NgbDateStruct, to: NgbDateStruct }): void {
    if (value) {
      this.fromDate = value.from;
      this.toDate = value.to;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
