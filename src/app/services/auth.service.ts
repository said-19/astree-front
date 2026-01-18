import { ResetPasswordDto } from "./../dto/reset-password.dto";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "https://localhost:7005/api/Auth"; // ✅ ton backend .NET swaggger apres le test 

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  // Connexion et stockage des tokens
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res?.token) {
          // Sauvegarde du token d'accès
          this.tokenStorage.saveAccessToken(res.token);

          // Si le backend renvoie un refresh token
          if (res.refreshToken) {
            this.tokenStorage.saveRefreshToken(res.refreshToken);
          }

          // Sauvegarder éventuellement l'utilisateur connecté
          if (res.user) {
            localStorage.setItem("currentUser", JSON.stringify(res.user));
          }
        }
      }),
      // Permet de renvoyer la réponse au composant
      map((res: any) => res),
      catchError((error) => {
        console.error("Erreur de connexion :", error);
        return throwError(() => error);
      })
    );
  }

  // Vérifie si connecté et token valide
  isAuthenticated(): boolean {
    return !this.tokenStorage.isTokenExpired();
  }

  // Récupérer le token
  getToken(): string | null {
    return this.tokenStorage.getAccessToken();
  }

  // Déconnexion
  logout(): Observable<any> {
    const token = localStorage.getItem("token"); // récupère le token stocké
    if (!token)
      return new Observable((observer) => observer.error("Token introuvable"));

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }
  // Envoyer email pour réinitialisation
  requestResetPassword(email: string): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/request-reset-password`,
      email
    );
  }

  // Réinitialiser le mot de passe
  resetPassword(request: ResetPasswordDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/reset-password`, request);
  }
}
