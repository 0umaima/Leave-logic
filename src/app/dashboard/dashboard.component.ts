import { Component } from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Demande } from '../models/demande.model';
import { DashboardService } from '../services/dashboard.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
	imports: [DecimalPipe,NgFor, FormsModule, NgbTypeaheadModule, NgbPaginationModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
	page = 1;
	pageSize = 4;
	collectionSize = 0;
	demandes!: Demande[];
  id!: number | undefined;
	constructor(private dashboardservice :DashboardService,private authenticate :AuthenticationService) {

	}

  ngAfterViewInit(): void {
    this.showDemande();
  }
  
  showDemande() {
    this.dashboardservice.getDemandWithUserDetails().subscribe(
      (data: any) => {
        this.demandes = [data]; //  demandes is an array of multple demandes
        this.collectionSize = this.demandes.length;
        this.refreshDemandes();
      },
      (error: any) => {
        console.error('Error fetching demand data:', error);
      }
    );
  }
  

	refreshDemandes() {
		this.demandes = this.demandes.map((demande, i) => ({ id: i + 1, ...demande })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}
}
