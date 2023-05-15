import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "ngx-webstorage";
import { Router } from "@angular/router";
import { ProductRequestHomePayload } from "src/app/home/product-request-home.payload";
import { SpecificProductInfoPayload } from "src/app/offer-product/offer-product-payload/specific-product-info.payload";
@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  public createProduct(product: FormData) {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/product/create`,
      product,
      {
        observe: "events",
        reportProgress: true,
      }
    );
  }

  public getProduct(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/api/product/${id}`
    );
  }

  public getAllProducts(
    offset: number,
    limit: number
  ): Observable<ProductRequestHomePayload[]> {
    return this.http.get<ProductRequestHomePayload[]>(
      `${environment.apiBaseUrl}/api/product/all?offset=${offset}&limit=${limit}`
    );
  }

  public getCurrentUserProducts(): Observable<ProductRequestHomePayload[]> {
    return this.http.get<ProductRequestHomePayload[]>(
      `${environment.apiBaseUrl}/api/product/my-products`
    );
  }

  // Products All Info __ Local Storage
  storageAllInfoForProduct(info: any) {
    this.localStorage.store("product-all-Info", info);
    if (this.getAllInfo()) {
      this.router.navigateByUrl("/product");
    }
  }

  getAllInfo() {
    console.log(
      this.localStorage.retrieve("product-all-Info") + "ahhhhhhhhhhhhhhh"
    );
    return this.localStorage.retrieve("product-all-Info");
  }

  public getSpecificProduct(productId: number) {
    return this.http.get<SpecificProductInfoPayload>(
      `${environment.apiBaseUrl}/api/product/${productId}`
    );
  }

  public editProduct(product: FormData) {
    return this.http.put<void>(
      `${environment.apiBaseUrl}/api/product/edit`,
      product,
      {
        observe: "events",
        reportProgress: true,
      }
    );
  }
}
