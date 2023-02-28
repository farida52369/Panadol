import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError, switchMap, take, filter } from "rxjs/operators";
import { AuthenticationResponsePayload } from "./login/authentication-response.payload";
import { AuthService } from "./service/auth.service";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptor implements HttpInterceptor {
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('We are In header Interceptor To modify header')
    if (req.url.indexOf("refresh") !== -1 || req.url.indexOf("login") !== -1) {
      console.log("req.url => ", req.url);
      return next.handle(req);
    }

    const jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      return next.handle(this.addToken(req, jwtToken)).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 403) {
            console.log("Unauthorized Request");
            return this.handleAuthErrors(req, next);
          } else {
            return throwError(() => new Error());
          }
        })
      );
    }
    return next.handle(req);
  }

  private handleAuthErrors(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: AuthenticationResponsePayload) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(
            refreshTokenResponse.authenticationToken
          );
          return next.handle(
            this.addToken(req, refreshTokenResponse.authenticationToken)
          );
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((result) => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(
            this.addToken(req, this.authService.getJwtToken())
          );
        })
      );
    }
  }

  private addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set("Authorization", `Bearer ${jwtToken}`),
    });
  }
}
