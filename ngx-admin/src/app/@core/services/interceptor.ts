// export interface Interceptor {
// }

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('kite_authorization')) {
      httpRequest = httpRequest.clone({ setHeaders: { authorization: sessionStorage.getItem('kite_authorization') } });      
    }
    return next.handle(httpRequest);
  }

}