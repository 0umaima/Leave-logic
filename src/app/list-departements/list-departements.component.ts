import { DecimalPipe } from '@angular/common';
import {  Departement, departements } from './../models/departement.model';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from '../shared/floatpop/popup.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-departements',
  standalone: true,
  imports: [DecimalPipe, FormsModule, NgbPaginationModule, NgbdModalBasic,RouterModule],
  templateUrl: './list-departements.component.html',
  styleUrl: './list-departements.component.css'
})
export class ListDepartementsComponent {
  page = 1;
	pageSize = 4;
	collectionSize = departements.length;
	dpts!: Departement[];
  showModal: boolean = false;

	constructor() {
		this.refreshDepartments();
	}

  refreshDepartments() {
    this.dpts = departements
      .map((dept: Departement, i: number) => ({ did: i + 1, ...dept }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


	}
