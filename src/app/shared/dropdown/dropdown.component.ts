import { NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

interface DropdownItem {
  label: string;
  value: any;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: true,
  imports: [NgbDropdownModule, NgFor] 
})
export class DropdownComponent {
  @Input() buttonText: string = 'Toggle dropdown';
  @Input() dropdownItems: DropdownItem[] = [];

  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();

  onItemClick(item: DropdownItem): void {
    this.itemSelected.emit(item.value);
  }
}