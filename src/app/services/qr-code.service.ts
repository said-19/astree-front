import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  private apiUrl = "https://localhost:7005/api/QRCode/generate"
;

  constructor(private http: HttpClient) {}

  generateQRCode(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
