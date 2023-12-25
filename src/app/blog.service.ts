import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Blog } from 'src/INTERFACE/blog';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http: HttpClient) { }
  getBlogs(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('http://localhost:3002/Blogs', requestOptions).pipe(
      map((res) => JSON.parse(res) ),
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  putBlog(Blog: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );

    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .put<any>('http://localhost:3002/Blogs', JSON.stringify(Blog), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Blog>),
        retry(3),
        catchError(this.handleError)
      );
  }


  getABlog(BlogId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf-8'
    );

    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('http://localhost:3002/Blogs/' + BlogId, requestOptions).pipe(
      map((res) => JSON.parse(res) as Blog),
      retry(3),
      catchError(this.handleError)
    );
  }

  deleteBlog(BlogId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );

    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .delete<any>('http://localhost:3002/Blogs/' + BlogId, requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Blog>),
        retry(3),
        catchError(this.handleError)
      );
  }


  postFashion(aBlog: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );

    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .post<any>('http://localhost:3002/Blogs/', JSON.stringify(aBlog), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Blog),
        retry(3),
        catchError(this.handleError)
      );
  }
}
