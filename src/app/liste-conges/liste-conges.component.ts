import { Component, OnInit } from '@angular/core';
import { DecimalPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DEMANDES, Demande } from '../models/demande.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-liste-conges',
  standalone: true,
  imports: [DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule, NgIf],
  templateUrl: './liste-conges.component.html',
  styleUrl: './liste-conges.component.css',
})
export class ListeCongesComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize = DEMANDES.length;
  conges!: Demande[];
  isHR: boolean = false;


  constructor() {
    this.refreshConges();
  }

  ngOnInit() {
    this.checkUserRole();
  }

  checkUserRole() {
    const user = localStorage.getItem('authUser');

    if (user) {
      const parsedUser = JSON.parse(user);
      this.isHR = parsedUser.roles.includes('HR');
    }
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

  exportToPDF() {
    try {
      console.log('Generating PDF...');
      const doc = new jsPDF();
      const title = 'Liste des Congés:';
      const columns = ['Employe', 'Type de congé', 'Durée', 'Status'];
      const rows = DEMANDES.map((conge, i) => [
        conge.id || i + 1,
        conge.motif || '',
        `De ${conge.date_debut || ''} à ${conge.date_fin || ''}`,
        conge.status || ''
      ]);

      // Add title
      doc.text(title, 14, 20);

      autoTable(doc, {
        head: [columns],
        body: rows as (string | number)[][],
        startY: 30,
        theme: 'grid'
      });

      doc.save('conges-list.pdf');
      console.log('PDF Generated and Saved!');
    } catch (error) {
      console.error('Error generating PDF: ', error);
    }
  }
}
