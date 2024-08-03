import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'https://localhost:44311/api/Account';

  constructor(private http: HttpClient) {}

  addNewUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user);
  }
}
