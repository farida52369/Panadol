import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { RegisterRequestPayload } from "src/app/auth/register/register-request.payload";
import { SellerRequestPayload } from "src/app/auth/seller/seller-payload/seller-request.payload";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class SignUpService {
  private authUrl: string = `${environment.apiBaseUrl}/api/auth`;
  constructor(private http: HttpClient, private authService: AuthService) {}

  public registerNewUser(user: RegisterRequestPayload): Observable<any> {
    return this.http
      .post<string>(`${this.authUrl}/register`, user, {
        responseType: "text",
      } as Record<string, unknown>)
      .pipe(
        map(() => {
          this.authService.setAuthenticatedUser(user.email);
        })
      );
  }

  public resendVerificationMail(): Observable<any> {
    return this.http.get(
      `${
        this.authUrl
      }/resend-verification?email=${this.authService.getUserWhoVerifyEmail()}`,
      {
        responseType: "text",
      } as Record<string, unknown>
    );
  }

  public registerNewSeller(
    sellerRequest: SellerRequestPayload
  ): Observable<any> {
    return this.http
      .post<string>(`${this.authUrl}/register/as/seller`, sellerRequest, {
        responseType: "text",
      } as Record<string, unknown>)
      .pipe(
        map((data) => {
          this.authService.setRole(data);
        })
      );
  }
}
