import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-departement-add',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './departement-add.component.html',
  styleUrl: './departement-add.component.css'
})
export class DepartementAddComponent {
  departementForm!: FormGroup;


  constructor(private formb : FormBuilder ){

  }

  onSubmit(){

  }

  Reset(){

  }
}
