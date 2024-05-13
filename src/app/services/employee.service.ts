import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Employees } from '../models/user.model';
import { HttpHeaders } from '@angular/common/http';

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



  addEmployee(employee: any, role: string): Observable<any> {
    const url = `${this.baseUrl}/add/${role}`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(url, employee, { headers: headers });
  }

  modifyEmploye(emp: Employees): Observable<any> {
    return this.http.put(`${this.baseUrl}/modify`, emp, { responseType: 'json' });
  } // need to work on this
}
