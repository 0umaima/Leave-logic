import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Departement } from '../models/departement.model';
import { DecimalPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { NgbdModalBasic } from "../shared/floatpop/popup.component";
import { DepartementService } from '../services/departement.service';

@Component({
    selector: 'app-list-departements',
    standalone: true,
    templateUrl: './list-departements.component.html',
    styleUrls: ['./list-departements.component.css'],
    imports: [DecimalPipe, NgFor,FormsModule, RouterModule, NgbPaginationModule, NgbdModalBasic]
})
export class ListDepartementsComponent {

  page = 1;
  pageSize = 4;
  collectionSize = 0;
  dpts!: any[];
  showModal: boolean = false;

  constructor(private modalService: NgbModal,private departementservice : DepartementService) {
  }


  ngAfterViewInit(): void {
    this.showDepartement();
  }

  showDepartement() {
    this.departementservice.getDepartment()
      .subscribe((data: any[]) => {
        this.dpts = data.map((departement: any, i: number) => ({
          id_dept: departement.id_dept,
         nom_dept: departement.nom_dept,
        }));
        this.collectionSize = this.dpts.length;
        this.refreshDepartments();
      });
  }

  refreshDepartments() {
    this.dpts = this.dpts
      .map((dept: Departement, i: number) => ({ did: i + 1, ...dept }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  modify(arg0: any) {
    throw new Error('Method not implemented.');
    }

    delete(id: number | undefined) {
      console.log('Deleting departement with ID:', id);
      if (!id) {
        console.error('Departeme,t ID is required');
        return;
      }
      this.departementservice.deleteDepartment(id);
    }

}
