import { EMPLOYEES } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employe-add.component.html',
  styleUrls: ['./employe-add.component.css'],
  standalone:true ,
  imports : [RouterLink ]
})
export class EmployeeComponent implements OnInit {
  employeeForm : any;
  data: any;
  submitted = false;
  show: boolean = false;
  constructor (private formBuilder : FormBuilder,private route : ActivatedRoute ,private router : Router)  {}


  ngOnInit(): void {


}


onSubmit() {
  this.submitted = true;
//add alert pop up
}

  formReset()
  {
   this.submitted=false;
  }



}
