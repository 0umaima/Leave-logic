import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { DEMANDES, Demande } from '../models/demande.model';


@Component({
  selector: 'app-liste-demandes',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    DropdownComponent,
  ],
  templateUrl: './liste-demandes.component.html',
  styleUrl: './liste-demandes.component.css',
})
export class ListeDemandesComponent {
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
