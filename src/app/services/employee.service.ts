import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Employees } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/employe'
  role: any;
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(`${this.baseUrl}/all`);
  }

  deleteEmployee(id: number | undefined ){
    this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  
// i need this for list-employee/employe-add
  addEmploye(emp: Employees): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, emp, { responseType: 'json' });
  } // need to work on this


  modifyEmploye(emp: Employees): Observable<any> {
    return this.http.put(`${this.baseUrl}/modify`, emp, { responseType: 'json' });
  } // need to work on this
}
