import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveRequestService {
  private baseUrl = 'http://localhost:8080/employe'

  constructor(private http: HttpClient) {}

  submitLeaveRequest(formData: any): Observable<any> {
    // Make an HTTP POST request to your backend
    return this.http.post(`${this.baseUrl}/leave-request`, formData);
  }
}