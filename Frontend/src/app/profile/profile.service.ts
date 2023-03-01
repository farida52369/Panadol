import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProfileResponsePayload } from "./profile-request.payload";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private userURL: string = `${environment.apiBaseUrl}/api/user`;

  constructor(private http: HttpClient) {}

  changeUsername(newUsername: string): Observable<any> {
    const params = new HttpParams().set("newUsername", newUsername);
    return this.http.get<boolean>(`${this.userURL}/newUsername`, { params });
  }

  changePhoneNumber(newPhoneNumber: string): Observable<any> {
    const params = new HttpParams().set("newPhoneNumber", newPhoneNumber);
    return this.http.get<boolean>(`${this.userURL}/newPhoneNumber`, { params });
  }

  changePassword(newPassword: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.userURL}/newPassword`, newPassword);
  }

  getProfileRequest(): Observable<ProfileResponsePayload> {
    return this.http.get<ProfileResponsePayload>(`${this.userURL}/profile`);
  }
}
