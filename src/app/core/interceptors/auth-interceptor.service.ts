import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from '@core/api-services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.authData$.pipe(
      take(1),
      exhaustMap(authData => {
        if (!authData) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          setHeaders: {
            authorization: `Bearer ${authData.token}`
          },
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
