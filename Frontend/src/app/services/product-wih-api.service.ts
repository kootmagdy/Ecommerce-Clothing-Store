import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductWihApiService {
  baseUrl: string = 'https://localhost:44311/api/product';
  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(this.baseUrl, { withCredentials: true });
  }

  getProductById(productId: number): Observable<Iproduct> {
    return this.http.get<Iproduct>(`${this.baseUrl}/${productId}`, { withCredentials: true });
  }

  addNewProduct(product: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, product, { withCredentials: true });
  }

  editProduct(productId: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${productId}`, product, { withCredentials: true });
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${productId}`, { withCredentials: true });
  }
}
