import { EmployeeService } from '../services/employee.service';
import { Component, ViewChild } from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {  Employees } from '../models/user.model';
import { NgbdModalBasic } from "../shared/floatpop/popup.component";
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-liste-employes',
    standalone: true,
    templateUrl: './liste-employes.component.html',
    styleUrls: ['./liste-employes.component.css'],
    providers: [NgbdModalBasic,NgFor] // Add NgbdModalBasic as a provider
    ,
    imports: [DecimalPipe, FormsModule, NgFor,NgbPaginationModule, NgbdModalBasic,RouterModule]
})
export class ListeEmployesComponent {

  @ViewChild(NgbdModalBasic) floatpopComponent!: NgbdModalBasic; // Assuming FloatpopComponent is the name of the component

  page = 1;
	pageSize = 4;
	employees!: any[];
	collectionSize = 0;
  showModal: boolean = false;

  constructor(private http: HttpClient,private employeeService :EmployeeService) {

    };



    ngAfterViewInit(): void {
      this.showEmploye();
    }

    showEmploye() {
      this.employeeService.getEmployees()
        .subscribe((data: any[]) => {
          this.employees = data.map((employee: any, i: number) => ({
            id: employee.id,
        nom: employee.nom,
        prenom: employee.prenom,
        email: employee.email,
        soldeconge: employee.soldeconge,
        role: employee.role, // Check if this is the correct key for the role
        departement: employee.departement,
          }));
          this.collectionSize = this.employees.length;
          this.refreshEmployees();
        });
    }


	refreshEmployees() {
		this.employees = this.employees.map((employee: Employees, i:number) => ({ id: i + 1, ...employee })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}

  modify(id : number | undefined) {
            //retrive the emplotye id from DB
            // change employe data
            // not all atribute necessarly should change
            // save to DB
  }
  onDeleteEmployee(id: number) {
    console.log('Deleting employee with ID:', id);
    if (!id) {
      console.error('Employee ID is required');
      return;
    }
    this.employeeService.deleteEmployee(id);
  }

}
