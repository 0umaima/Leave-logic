import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Departement, departements } from '../models/departement.model';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { NgbdModalBasic } from "../shared/floatpop/popup.component";

@Component({
    selector: 'app-list-departements',
    standalone: true,
    templateUrl: './list-departements.component.html',
    styleUrls: ['./list-departements.component.css'],
    imports: [DecimalPipe, FormsModule, RouterModule, NgbPaginationModule, NgbdModalBasic]
})
export class ListDepartementsComponent {
  page = 1;
  pageSize = 4;
  collectionSize = departements.length;
  dpts!: Departement[];
  showModal: boolean = false;

  constructor(private modalService: NgbModal) {
    this.refreshDepartments();
  }

  refreshDepartments() {
    this.dpts = departements
      .map((dept: Departement, i: number) => ({ did: i + 1, ...dept }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openModal(content : any) {
    this.modalService.open(content);
  }
}
