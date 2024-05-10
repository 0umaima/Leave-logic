import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DEMANDES, Demande } from '../models/demande.model';

@Component({
  selector: 'app-liste-conges',
  standalone: true,
	imports: [DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule],
  templateUrl: './liste-conges.component.html',
  styleUrl: './liste-conges.component.css'
})

export class ListeCongesComponent {
	page = 1;
	pageSize = 4;
	collectionSize = DEMANDES.length;
	conges!: Demande[];
	selectedOption: string = '';
	dropdownButtonText: string = 'sélectionnez statut';
  
  
	Status = [{
	  label: 'Autorisé', value: 'Autorisé'
	}, {
	  label: 'Refusé', value: 'Refusé'
	}]
  
	
	constructor() {
	  this.refreshConges();
	}
  
	refreshConges() {
	  this.conges = DEMANDES.map((conge, i) => ({
		id: i + 1,
		...conge,
	  })).slice(
		(this.page - 1) * this.pageSize,
		(this.page - 1) * this.pageSize + this.pageSize
	  );
	}
  
	handleDropdownSelection(selectedStatus: any): void {
	  this.selectedOption = selectedStatus;
	  const selectedDepartment = this.Status.find(
		(dept) => dept.value === selectedStatus
	  );
	  if (selectedDepartment) {
		this.dropdownButtonText = selectedDepartment.label;
	  }
   }
}