import { Injectable } from '@angular/core';
import { Demande } from './models/demande.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { demandeConge } from './models/demande_conge.model';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  private baseUrl = 'http://localhost:8080/conges'

  constructor(private http: HttpClient) {}

  getConge(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
}
