import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProductRequestPayload } from "./product-request.payload";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>("");
  searchTerm$ = this.searchTerm.asObservable();

  private categoryFilter = new BehaviorSubject<string>("");
  categoryFilter$ = this.categoryFilter.asObservable();

  private priceFilter = new BehaviorSubject<string>("");
  priceFilter$ = this.priceFilter.asObservable();

  private reviewFilter = new BehaviorSubject<string>("");
  reviewFilter$ = this.reviewFilter.asObservable();

  constructor(private http: HttpClient) {}

  setSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

  public setCategoryFilter(term: string) {
    this.categoryFilter.next(term);
  }

  public setPriceFilter(term: string) {
    this.priceFilter.next(term);
  }

  public setReviewFilter(term: string) {
    this.reviewFilter.next(term);
  }

  public getProducts(
    searchBy: string,
    filterByCategory: string,
    filterByPrice: string,
    filterByReview: string
  ): Observable<any> {
    console.log(
      `Filter By Before Sending To Server ${filterByCategory}, ${filterByPrice}, ${filterByReview}`
    );
    const params = new HttpParams()
      .set("searchBy", searchBy)
      .set("filterByCategory", filterByCategory)
      .set("filterByPrice", filterByPrice)
      .set("filterByReview", filterByReview);

    return this.http.get<void>(`${environment.apiBaseUrl}/api/search`, {
      params,
    });
  }
}
