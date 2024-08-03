import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:44311/api/login'; 

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    const body = { userName, password };
    return this.http.post<any>(this.apiUrl, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true // Ensure credentials are included
    });
  }


}