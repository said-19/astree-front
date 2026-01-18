import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl =   'https://localhost:7005/api/User'; // adapte ton URL

  constructor(private http: HttpClient) { }

  getUserCountByRole(): Observable<any> {
    
    return this.http.get(`${this.apiUrl}/count-by-role`);
  }

  getMonthlyRegistrations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/registrations/monthly`);
  }

  getActivityRate(days: number = 30): Observable<any> {
    return this.http.get(`${this.apiUrl}/activity-rate?days=${days}`);
  }

  exportExcelReport(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/reports/export/excel`, { responseType: 'blob' });
  }

  exportPdfReport(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/pdf`, { responseType: 'blob' });
  }
}
