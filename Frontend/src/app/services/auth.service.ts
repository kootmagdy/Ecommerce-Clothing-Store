import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:44311/api/Account';
  private apiUrl2 = 'https://localhost:44311/api/login';
  constructor(private http: HttpClient) {}

  getStatus(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/logout`, {
      withCredentials: true, // Ensure credentials are included
    });
  }
}
