// ANGULAR
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestModified = this.addHeaderToRequestWithoutToken(request);
    return next.handle(requestModified);
  }


  // ATTACH HEARDER AT THE REQUEST WITHOUT TOKEN OR AUTHORIZATION
  private addHeaderToRequestWithoutToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
  }
}
