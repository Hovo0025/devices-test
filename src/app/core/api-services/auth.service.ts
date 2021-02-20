import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import { environment } from '@env/environment';
import { AuthSignIn } from '@core/models/auth.model';
import { LocalStorageConstants } from '@core/constants/local-storage.constants';
import { AuthData } from '../../auth/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authData$ = new BehaviorSubject<any>(null);
  private apiUrl = environment.apiUrl;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public signIn(requestData) {
    const url = `${this.apiUrl}auth/login`;
    return this.http.post<AuthSignIn>(url, requestData)
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.data.expires_at,
            resData.data.access_token
          );
        })
      );
  }

  private handleAuthentication(expiresAt, token) {
    const expirationDate = new Date(new Date().getTime() + Math.ceil(expiresAt / 1000));
    const authData = new AuthData(token, expirationDate);
    this.authData$.next(authData);
    this.autoLogout( Math.ceil(expiresAt / 1000));
    localStorage.setItem(LocalStorageConstants.authData, JSON.stringify(authData));
  }

  autoLogin() {
    const auth: {
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem(LocalStorageConstants.authData));
    if (!auth) {
      return;
    }

    const authData = new AuthData(
      auth._token,
      new Date(auth._tokenExpirationDate)
    );

    if (authData.token) {
      this.authData$.next(authData);
      const expirationDuration =
        new Date(auth._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.authData$.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('authData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    if (errorRes.error.error.data.msg) {
      errorMessage = errorRes.error.error.data.msg;
    }
    return throwError(errorMessage);
  }

}
