import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrat } from '../models/contrat';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private apiUrl = 'https://localhost:7005/api/contrats';

  constructor(private http: HttpClient) {}

  getContrats(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getContrat(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createContrat(contrat: Contrat): Observable<any> {
    return this.http.post<any>('https://localhost:7005/create-contrat', contrat);
  }

  updateContrat(id: number, contrat: Contrat): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contrat);
  }

  deleteContrat(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
