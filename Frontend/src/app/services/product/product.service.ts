import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  ProductAllInfo,
  ProductEdit,
  ProductResponse,
  ProductSpecificDetails,
} from "src/app/dto/data";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "ngx-webstorage";
import { Router } from "@angular/router";
import { ProductRequestPayload } from "src/app/home/product-request.payload";
import { SomeProductInfoPayload } from "src/app/offer-product/offer-product-payload/some-product-info.payload";
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

  public getProduct(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${environment.apiBaseUrl}/api/product/${id}`
    );
  }

  public getAllProducts(
    offset: number,
    limit: number
  ): Observable<ProductRequestPayload[]> {
    return this.http.get<ProductRequestPayload[]>(
      `${environment.apiBaseUrl}/api/product/all?offset=${offset}&limit=${limit}`
    );
  }

  public getCurrentUserProducts(): Observable<ProductRequestPayload[]> {
    return this.http.get<ProductRequestPayload[]>(
      `${environment.apiBaseUrl}/api/product/my-products`
    );
  }

  // Products All Info __ Local Storage
  storageAllInfoForProduct(info: ProductAllInfo) {
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
    return this.http.get<SomeProductInfoPayload>(
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
