import { Injectable } from "@angular/core";
import { ReviewResponsePayload } from "./review-response.payload";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  public sendReview(reviewResponse: ReviewResponsePayload) {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/product/send-review`,
      reviewResponse,
      {
        observe: "events",
        reportProgress: true,
      }
    );
  }

  public getProductReviews(
    productId: number
  ): Observable<ReviewResponsePayload[]> {
    return this.http.get<ReviewResponsePayload[]>(
      `${environment.apiBaseUrl}/api/product/reviews/${productId}`
    );
  }
}
