import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import {  Demande } from '../models/demande.model';
import { CongeService } from '../conge.service';

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
	collectionSize = 0;
	conges!: Demande[];
	selectedOption: string = '';
	dropdownButtonText: string = 'sélectionnez statut';


	Status = [{
	  label: 'Autorisé', value: 'Autorisé'
	}, {
	  label: 'Refusé', value: 'Refusé'
	}]

  constructor(private congeservice : CongeService) {
	}
  ngAfterViewInit(): void {
    this.showDemande();
  }
  showDemande() {
    this.congeservice.getConge()
      .subscribe((data: Demande[]) => {
        this.conges = data.map((demandes: any, i: number) => ({
          id: demandes.id,
          motif:demandes.motif,
          date_debut : demandes.date_debut,
          date_fin : demandes.date_fin,
          status: demandes.statu
        }));
        this.collectionSize = this.conges.length;
        this.refreshConges();
      });
  }



	refreshConges() {
	  this.conges = this.conges.map((conge, i) => ({
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
