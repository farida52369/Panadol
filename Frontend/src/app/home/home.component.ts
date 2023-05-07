import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "../services/product/product.service";
import { AuthService } from "../auth/service/auth.service";
import { SearchService } from "./search.service";
import { ProductRequestPayload } from "./product-request.payload";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  // Filtering
  searchTerm!: string;
  categoryFilter!: string;
  priceFilter!: string;
  reviewFilter!: string;
  // Products
  productsToBeViewed: Array<ProductRequestPayload> = [];

  productToCart: any;
  @ViewChild("noProductFound") noProductEle: ElementRef | undefined;
  loggin!: boolean;
  isManager!: Boolean;
  // Paging and See More
  offset: number = 0;
  limit: number = 20;
  showMore!: boolean;
  // MyPersonalProducts
  myPersonalProducts!: boolean;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggin = this.authService.isLoggedIn();
    this.route.queryParams.subscribe((params) => {
      this.myPersonalProducts = params["myProducts"] === "true";
      this.searchTerm = params["searchTerm"] ?? "";
      this.priceFilter = params["priceFilter"] ?? "";
      this.reviewFilter = params["reviewFilter"] ?? "";
      this.categoryFilter = params["categoryFilter"] ?? "";
    });

    if (this.myPersonalProducts) {
      this.showCurrentUserProducts();
    } else if (!this.allEmpty()) {
      this.getProductsBySearch();
    } else {
      this.showProducts();
      this.showMore = true;
    }

    // Clean after you, please ...
    this.authService.clearSessionStorage();

    // Init subscribers
    this.initSubscribers();
  }

  private initSubscribers() {
    this.searchService.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
      this.getProductsBySearch();
      // console.info(`Hello Search Term: ${term}`);
    });

    this.searchService.categoryFilter$.subscribe((term) => {
      this.categoryFilter = term;
      this.getProductsBySearch();
      // console.info(`Hello Category Filter: ${term}`);
    });

    this.searchService.priceFilter$.subscribe((term) => {
      this.priceFilter = term;
      this.getProductsBySearch();
      // console.info(`Hello Price Filter: ${term}`);
    });

    this.searchService.reviewFilter$.subscribe((term) => {
      this.reviewFilter = term;
      this.getProductsBySearch();
      // console.info(`Hello Review Filter: ${term}`);
    });
  }

  private getProductsBySearch() {
    if (this.allEmpty()) return;
    this.searchService
      .getProducts(
        this.searchTerm || "",
        this.categoryFilter || "",
        this.priceFilter || "",
        this.reviewFilter || "0.0"
      )
      .subscribe({
        next: (data) => {
          this.productsToBeViewed = data;
          this.handleRate(0, data.length);
        },
        error: (error) => {
          console.error(`Error: ${error}`);
        },
      });
  }

  allEmpty(): boolean {
    return (
      !this.searchTerm &&
      !this.categoryFilter &&
      !this.priceFilter &&
      !this.reviewFilter
    );
  }

  handleRate(from: number, to: number): void {
    // console.log(`From: ${from}, To: ${to}`);
    for (let i = from; i < to; i++) {
      // console.log(`Image #${i}: ${this.productsToBeViewed[i].image.toString()}`)
      const num = this.roundToHalf(this.productsToBeViewed[i].rate);
      const fullStars = Math.floor(num);
      const hasHalfStar = num % 1 !== 0;
      const halfStar = hasHalfStar ? [1] : [];
      const fullStarList = Array(fullStars)
        .fill(1)
        .map((_, i) => i + 1);
      const borderStar = Array(5 - fullStars - halfStar.length)
        .fill(1)
        .map((_, i) => i + 1);
      this.productsToBeViewed[i].star = fullStarList;
      this.productsToBeViewed[i].star_border = borderStar;
      this.productsToBeViewed[i].star_half = halfStar;
    }
  }

  roundToHalf(num: number): number {
    const decimal = num - Math.floor(num);
    if (decimal < 0.25) {
      return Math.floor(num) + 0.0;
    } else if (decimal >= 0.25 && decimal < 0.75) {
      return Math.floor(num) + 0.5;
    } else {
      return Math.ceil(num);
    }
  }

  showCurrentUserProducts() {
    this.productService.getCurrentUserProducts().subscribe({
      next: (res) => {
        if (res.length == 0) {
          console.log("No More Products ...");
        } else {
          this.productsToBeViewed = res;
          this.handleRate(0, res.length);
        }
      },
    });
  }

  showProducts() {
    this.productService
      .getAllProducts(this.offset, this.limit)
      .subscribe((res) => {
        if (res.length === 0) {
          this.showMore = false;
          console.log("No More Products ...");
        } else {
          const from = this.offset * this.limit;
          const to = this.offset * this.limit + res.length;
          this.productsToBeViewed = [...this.productsToBeViewed, ...res];
          this.handleRate(from, to);
          this.offset += 1;
          console.log(`Products from ${from} to ${to} => ${res}`);
        }
      });
  }

  editProduct(productId: any) {
    this.router.navigate(["offer-product"], {
      queryParams: { isEdit: true, productId: productId },
    });
  }

  viewProduct(id: any) {
    /*
    let productAllInfoToView: ProductAllInfo;
    this.productService
      .productAllInfo(id, this.authService.getUserEmail())
      .subscribe((res) => {
        productAllInfoToView = res;
        console.log(productAllInfoToView);
        this.productService.storageAllInfoForProduct(productAllInfoToView);
      });
      */
  }
}
