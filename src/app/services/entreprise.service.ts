import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entreprise, EntrepriseCreateDto, EntrepriseUpdateDto } from '../models/entreprise';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  private apiUrl = 'https://localhost:7005/api/entreprises';

  constructor(private http: HttpClient) {}

  getEntreprises(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(this.apiUrl);
  }

  getEntreprise(id: number): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.apiUrl}/${id}`);
  }

  createEntreprise(dto: EntrepriseCreateDto): Observable<Entreprise> {
    return this.http.post<Entreprise>(this.apiUrl, dto);
  }

  updateEntreprise(dto: EntrepriseUpdateDto): Observable<Entreprise> {
    return this.http.put<Entreprise>(`${this.apiUrl}/${dto.id}`, dto);
  }

  deleteEntreprise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
