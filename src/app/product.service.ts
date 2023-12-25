import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _http: HttpClient) { }
  private apiURL = 'http://localhost:3002';
  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const requestOptions: Object = {
      headers: headers
    };
    return this._http.get<Product[]>(`${this.apiURL}/products/`, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Xử lý lỗi máy khách xảy ra
      console.error('Lỗi máy khách:', error.error.message);
    } else {
      // Xử lý lỗi phía máy chủ
      console.error('Lỗi phía máy chủ:', error.status, error.error);
    }
    return throwError('Có lỗi xảy ra. Vui lòng thử lại sau.');
  }
}













