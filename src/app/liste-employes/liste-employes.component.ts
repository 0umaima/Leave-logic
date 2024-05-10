import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { EMPLOYEES, Employees } from '../models/user.model';




@Component({
  selector: 'app-liste-employes',
  standalone: true,
	imports: [DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule],
  templateUrl: './liste-employes.component.html',
  styleUrl: './liste-employes.component.css'
})
export class ListeEmployesComponent {
  page = 1;
	pageSize = 4;
	collectionSize = EMPLOYEES.length;
	employees!: Employees[];

	constructor() {
		this.refreshEmployees();
	}

	refreshEmployees() {
		this.employees = EMPLOYEES.map((employee: Employees, i:number) => ({ id: i + 1, ...employee })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}
}
