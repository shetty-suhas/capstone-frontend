import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { EventUser } from 'src/app/EventUser.model';
import { EventUserRequest } from './event-user-request.model';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8094/user';  
  constructor(private http: HttpClient) { }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  login(name: string, password: string): Observable<any> {
    const loginRequest = new EventUserRequest(name, password);
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, loginRequest)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        
          const decodedToken = this.decodeToken(response.token);
          console.log('Decoded token:', decodedToken); 
          if (decodedToken) {
            const username = decodedToken.sub; 
            localStorage.setItem('username', username);
          }
        }),
        switchMap(() => {
          const username = this.getUsername();
          if (!username) {
            throw new Error('Username not found in token');
          }
          return this.getUserByUsername(username);
        }),
        tap(user => {
          localStorage.setItem('userId', user.id);
        })
      );
  }

  getUserByUsername(username: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/byName/${username}`, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  } 

  signup(user: EventUser): Observable<EventUser> {
    return this.http.post<EventUser>(`${this.apiUrl}/auth/create`, user);
  }
}
