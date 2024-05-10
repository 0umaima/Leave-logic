import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DEMANDES, Demande } from '../models/demande.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
	imports: [DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
	page = 1;
	pageSize = 4;
	collectionSize = DEMANDES.length;
	demandes!: Demande[];

	constructor() {
		this.refreshDemandes();
	}

	refreshDemandes() {
		this.demandes = DEMANDES.map((demande, i) => ({ id: i + 1, ...demande })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}
}