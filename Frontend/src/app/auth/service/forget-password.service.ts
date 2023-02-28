import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { PasswordResetRequestPayload } from "src/app/auth/forget-password/password-request.payload";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ForgetPasswordService {
  private authUrl: string = `${environment.apiBaseUrl}/api/auth`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public forgetPassword(email: string): Observable<any> {
    return this.http
      .get<string>(`${this.authUrl}/forget-password?email=${email}`, {
        responseType: "text",
      } as Record<string, unknown>)
      .pipe(
        map((data) => {
          console.info(data);
          this.authService.setAuthenticatedUser(email);
        })
      );
  }

  public checkResetToken(token: string): Observable<any> {
    return this.http.get<boolean>(
      `${this.authUrl}/verify-reset-token?token=${token}`
    );
  }

  public resendPasswordMail(): Observable<any> {
    return this.http.get(
      `${
        this.authUrl
      }/resend-token?email=${this.authService.getUserWhoVerifyEmail()}`,
      {
        responseType: "text",
      } as Record<string, unknown>
    );
  }

  public resetPassword(passwordRequest: PasswordResetRequestPayload) {
    return this.http.post(`${this.authUrl}/reset-password`, passwordRequest, {
      responseType: "text",
    });
  }
}
