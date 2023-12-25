import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PaymentInfo,discountInfo } from 'src/INTERFACE/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  get<T>(arg0: string, requestOptions: Object) {
    throw new Error('Method not implemented.');
  }

  constructor(private _http: HttpClient) { }
//payment
  getPayment():Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("http://localhost:3002/PaymentInfo",requestOptions).pipe(
  map(res=>JSON.parse(res) as Array<PaymentInfo>),
  retry(3),
  catchError(this.handleError));
  };

  postPayment(aPaymentInfo: any): Observable<PaymentInfo> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
  
  
    const requestOptions: Object = {
      headers: headers,
      responseType: 'json',
    };
    return this._http.post<PaymentInfo>('http://localhost:3002/PaymentInfo', aPaymentInfo, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  //discount
getDiscount():Observable<any>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("http://localhost:3002/discountInfo",requestOptions).pipe(
  map(res=>JSON.parse(res) as Array<discountInfo>),
  retry(3),
  catchError(this.handleError));
  };

getDiscountA(_id:any):Observable<discountInfo[]>
  {
  const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
  const requestOptions:Object={
  headers:headers,
  responseType:"text"
  }
  return this._http.get<any>("http://localhost:3002/discountInfo/" + _id,requestOptions).pipe(
  map(res=>JSON.parse(res) as Array<discountInfo>),
  retry(3),
  catchError(this.handleError));
  };

deleteDiscount(_id: string): Observable<any> {
    return this._http.delete<discountInfo[]>('http://localhost:3002/discountInfo/' + _id).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  putDiscount(discount: any): Observable<discountInfo> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );

    const requestOptions: Object = {
      headers: headers,
      responseType: 'json',
    };
    return this._http.put<discountInfo>('http://localhost:3002/discountInfo', discount, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }


  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
    } 
    
    
  customerInfo: any = {};

  saveCustomerInfo(info: any): void {
    this.customerInfo = info;
  }
  getCustomerInfo(): any {
    return this.customerInfo;
  }
}
