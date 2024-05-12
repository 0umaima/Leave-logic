    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { Observable } from 'rxjs';
    import { Employees } from './models/user.model';

    @Injectable({
      providedIn: 'root'
    })
    export class EmployeeService {
      private apiUrl = 'http://localhost:8080/employe/all';

      constructor(private http: HttpClient) {}

      getEmployees(): Observable<Employees[]> {
        return this.http.get<Employees[]>(this.apiUrl);
      }

    }
