import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { map, Observable, tap } from "rxjs";
import { AuthenticationResponsePayload } from "src/app/auth/login/authentication-response.payload";
import { LoginRequestPayload } from "src/app/auth/login/login-request.payload";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class SignInService {
  private authUrl: string = `${environment.apiBaseUrl}/api/auth`;
  constructor(private http: HttpClient, private authService: AuthService) {}

  public checkEmail(email: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.authUrl}/checkEmail?email=${email}`)
      .pipe(
        map((checked) => {
          if (checked) {
            this.authService.setAuthenticatedUser(email);
          }
          return checked;
        })
      );
  }

  public login(user: LoginRequestPayload): Observable<boolean> {
    this.authService.clearLocalStorage();
    return this.http
      .post<AuthenticationResponsePayload>(`${this.authUrl}/login`, user)
      .pipe(
        map((data) => {
          this.authService.setLocalStorage(data);
          return true;
        })
      );
  }
}
