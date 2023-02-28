import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { tap } from "rxjs";
import { Alert } from "src/app/common/alert";
import { environment } from "src/environments/environment";
import { AuthenticationResponsePayload } from "../login/authentication-response.payload";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authUrl: string = `${environment.apiBaseUrl}/api/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService
  ) {}

  public refreshToken() {
    return this.http
      .post<AuthenticationResponsePayload>(`${this.authUrl}/refresh/token`, {
        refreshToken: this.getRefreshToken(),
        email: this.getUserEmail(),
      })
      .pipe(
        tap((response) => {
          // restore them
          this.setLocalStorage(response);
        })
      );
  }

  public logout(): void {
    this.http
      .post(
        `${this.authUrl}/logout`,
        {
          refreshToken: this.getRefreshToken(),
          email: this.getUserEmail(),
        },
        {
          responseType: "text",
        }
      )
      .subscribe({
        next: (data) => {
          console.info(`Auth Service Logout Message: ${data}`);
          Alert.successAlert("We'll miss you :)");
        },
        error: (error) => {
          console.error(`Error In Auth Service Logout\n${error}`);
          Alert.errorAlert("Error When Logging Out, A7san!");
        },
        complete: () => {
          this.clearLocalStorage();
          this.router.navigate(["/home"]).then(() => {
            location.reload();
          });
        },
      });
  }

  // Authentication
  public isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  public getJwtToken(): string {
    return this.localStorage.retrieve("authentication_token");
  }

  public getUserEmail(): string {
    return this.localStorage.retrieve("c_email");
  }

  public getRefreshToken(): string {
    return this.localStorage.retrieve("refresh_token");
  }

  public getUserRole(): string {
    return this.localStorage.retrieve("role");
  }

  public setRole(role: string) {
    this.localStorage.store("role", role);
  }

  public setLocalStorage(data: AuthenticationResponsePayload): void {
    this.localStorage.store("authentication_token", data.authenticationToken);
    this.localStorage.store("expires_at", data.expiresAt);
    this.localStorage.store("refresh_token", data.refreshToken);
    this.localStorage.store("c_email", data.email);
    this.localStorage.store("role", data.role);
  }

  public clearLocalStorage(): void {
    this.localStorage.clear("authentication_token");
    this.localStorage.clear("c_email");
    this.localStorage.clear("refresh_token");
    this.localStorage.clear("expires_at");
    this.localStorage.clear("role");
  }

  // dealing with Confirm Email Address
  public setAuthenticatedUser(email: string) {
    this.sessionStorage.store("email_to_verify", email);
  }

  public getUserWhoVerifyEmail(): string {
    return this.sessionStorage.retrieve("email_to_verify");
  }

  public clearSessionStorage(): void {
    this.sessionStorage.clear("email_to_verify");
  }
}
