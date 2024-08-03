import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'https://localhost:44311/api/role';

  constructor(private http: HttpClient) { }

  addRole(roleName: string): Observable<any> {
    const body = JSON.stringify({ RoleName: roleName }); // Ensure the payload is JSON
    return this.http.post<any>(this.apiUrl, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), // Set the correct content type
      withCredentials: true // Include credentials if needed
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      // Handle 403 Forbidden error
      return throwError('You do not have permission to perform this action.');
    }
    return throwError('An error occurred. Please try again later.');
  }
}
