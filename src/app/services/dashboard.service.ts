import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Demande } from '../models/demande.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/demandes';

  constructor(private http: HttpClient) {}

  getDemandWithUserDetails(): Observable<any> { // when login is success dont forget to pass the current user id
    return this.http.get<any>(`http://localhost:8080/demandes/1052`).pipe(
      map((response: any[]) => {
        if (response && response.length > 0) {
          const demand = response[0];
          return {
            motif: demand.motif,
            date_debut: demand.date_debut,
            date_fin: demand.date_fin,
            status: demand.status
          };
        } else {
          throw new Error('Received empty or undefined demand data from the server.');
        }
      }),
      catchError((error: any) => {
        throw new Error('Error fetching demand data: ' + error);
      })
    );
  }
}
