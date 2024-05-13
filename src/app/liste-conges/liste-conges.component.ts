import { Component, OnInit } from '@angular/core';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

import { CongeService } from '../conge.service';
import { demandeConge } from '../models/demande_conge.model';

@Component({
  selector: 'app-liste-conges',
  standalone: true,
  imports: [DecimalPipe,FormsModule, NgbTypeaheadModule, NgbPaginationModule,NgFor, NgIf],
  templateUrl: './liste-conges.component.html',
  styleUrl: './liste-conges.component.css',
})

export class ListeCongesComponent {
	page = 1;
	pageSize = 4;
	collectionSize = 0;
	conges!: demandeConge[];
  isHR: boolean = false;






  constructor(private congeservice : CongeService) {
    this.refreshConges();

	}

  ngOnInit() {
    this.checkUserRole();
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
  
  exportToPDF() {
    // try {
    //   console.log('Generating PDF...');
    //   const doc = new jsPDF();
    //   const title = 'Liste des Congés:';
    //   const columns = ['Employe', 'Type de congé', 'Durée', 'Status'];
    //   const rows = this.conges.map((conge, i) => [
    //     conge.id || i + 1,
    //     conge.motif || '',
    //     `De ${conge.date_debut || ''} à ${conge.date_fin || ''}`,
    //     conge.status || ''
    //   ]);

    //   // Add title
    //   doc.text(title, 14, 20);

    //   autoTable(doc, {
    //     head: [columns],
    //     body: rows as (string | number)[][],
    //     startY: 30,
    //     theme: 'grid'
    //   });

    //   doc.save('conges-list.pdf');
    //   console.log('PDF Generated and Saved!');
    // } catch (error) {
    //   console.error('Error generating PDF: ', error);
    // }
  }  

  checkUserRole() {
    const user = localStorage.getItem('authUser');

    if (user) {
      const parsedUser = JSON.parse(user);
      this.isHR = parsedUser.roles.includes('HR');
    }
  }




}
