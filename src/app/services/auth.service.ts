import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'edu_token';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post('/api/auth/login', credentials).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem(this.tokenKey, res.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
