import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { PaymentInfo } from '././INTERFACE/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  constructor(private _http: HttpClient) { }
  
  getPayment(): Observable<PaymentInfo[]> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get<PaymentInfo[]>("http://localhost:3002/PaymentInfo").pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  getPaymentByCustomerName(customerName: string): Observable<PaymentInfo[]> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
  
    return this._http.get<any>("http://localhost:3002/PaymentInfo/Name/" + customerName, requestOptions).pipe(
      map(res => JSON.parse(res) as PaymentInfo[]),
      retry(3),
      catchError(this.handleError)
    );
  }
  getPaymentByID(_id: string): Observable<PaymentInfo> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'json'
    };
    return this._http.get<PaymentInfo>('http://localhost:3002/PaymentInfo/' + _id, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  putPayment(PaymentInfo: any): Observable<PaymentInfo> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
  
    const requestOptions: Object = {
      headers: headers,
      responseType: 'json',
    };
    return this._http.put<PaymentInfo>('http://localhost:3002/PaymentInfo', PaymentInfo, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  deletePayment(_id: string): Observable<PaymentInfo[]> {
    return this._http.delete<PaymentInfo[]>('http://localhost:3002/PaymentInfo/' + _id).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

}