import { Injectable } from '@angular/core';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  // Choisis localStorage pour "se souvenir de moi", sinon sessionStorage
  private storage: Storage = localStorage;

  useSessionStorage() {
    this.storage = sessionStorage;
  }

  saveAccessToken(token: string) {
    this.storage.setItem(ACCESS_TOKEN_KEY, token);
  }
  getAccessToken(): string | null {
    return this.storage.getItem(ACCESS_TOKEN_KEY);
  }
  removeAccessToken() {
    this.storage.removeItem(ACCESS_TOKEN_KEY);
  }

  saveRefreshToken(token: string) {
    this.storage.setItem(REFRESH_TOKEN_KEY, token);
  }
  getRefreshToken(): string | null {
    return this.storage.getItem(REFRESH_TOKEN_KEY);
  }
  clear() {
    this.storage.removeItem(ACCESS_TOKEN_KEY);
    this.storage.removeItem(REFRESH_TOKEN_KEY);
  }

  // Décodage rapide du payload JWT (sans lib externe)
  getJwtPayload(): any | null {
    const token = this.getAccessToken();
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    try {
      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const payload = this.getJwtPayload();
    if (!payload || !payload.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp <= now;
  }
}
