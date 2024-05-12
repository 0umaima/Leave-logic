import { Injectable } from '@angular/core';
import { Departement } from '../models/departement.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private baseUrl = 'http://localhost:8080/departement'
    constructor(private http: HttpClient) {}

  getDepartment(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.baseUrl}/all`);
  }

  deleteDepartment(id: number) {
    this.http.delete(`${this.baseUrl}/delete/${id}`)
      .toPromise()
      .then(() => {
        console.log('Department deleted successfully');
        this.getDepartment(); // Update the UI by fetching the updated list of departments
      })
      .catch((error) => {
        console.error('Error deleting department:', error);
      });
  }



  addDepartment(department: Departement): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, department);
  } // need to work on this

  modifyDepartment(department: Departement): Observable<any> {
    return this.http.put(`${this.baseUrl}/add`, department);
}
}
