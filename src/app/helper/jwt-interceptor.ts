import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
        if (currentAdmin && currentAdmin.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentAdmin.token}`
                }
            });
        }
 
        return next.handle(request);
    }
}