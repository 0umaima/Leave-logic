import { Component } from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CongeService } from '../conge.service';
import { demandeConge } from '../models/demande_conge.model';

@Component({
  selector: 'app-liste-conges',
  standalone: true,
	imports: [DecimalPipe, NgFor,FormsModule, NgbTypeaheadModule, NgbPaginationModule],
  templateUrl: './liste-conges.component.html',
  styleUrl: './liste-conges.component.css'
})

export class ListeCongesComponent {
	page = 1;
	pageSize = 4;
	collectionSize = 0;
	conges!: demandeConge[];
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
    this.congeservice.getConge().subscribe(
        (data: any) => {
            // Check if data is an object
            if (typeof data === 'object' && data !== null) {
                // Map the data keys to employe and values to motif, date_debut, and date_fin
                this.conges = Object.keys(data).map((employe: string) => ({
                    employe: employe,
                    motif: data[employe][0],
                    date_debut: data[employe][1],
                    date_fin: data[employe][2]
                }));
                this.collectionSize = this.conges.length;
                this.refreshConges();
            } else {
                console.error("Data received from API is not an object.");
            }
        },
        error => {
            console.error("Error fetching data from API:", error);
        }
    );
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
