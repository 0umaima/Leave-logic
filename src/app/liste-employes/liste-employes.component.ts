import { EmployeeService } from './../employee.service';
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
    imports: [DecimalPipe, FormsModule, NgbPaginationModule, NgbdModalBasic,RouterModule]
})
export class ListeEmployesComponent {

  @ViewChild(NgbdModalBasic) floatpopComponent!: NgbdModalBasic; // Assuming FloatpopComponent is the name of the component

  page = 1;
	pageSize = 4;
	collectionSize = 20;
	employees!: Employees[];
  showModal: boolean = false;

  constructor(private http: HttpClient,private employeeService :EmployeeService) {
    this.employeeService.getEmployees().subscribe((employees) => {
      console.log(employees);
      this.employees = employees;
    });
    };
    ngAfterViewInit(): void {
      this.refreshEmployees();
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

  delete(id : number | undefined){
    // confirm to delete this employee
    //retribe employe id from DB
    //invoke bakend method deletebyid()
    //save
  }


}
