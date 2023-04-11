import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "../services/product/product.service";
import { CartService } from "../cart/cart.service";
import { UserService } from "../services/user/user.service";
import { ProductAllInfo } from "../dto/data";
import { AuthService } from "../auth/service/auth.service";
import { SearchService } from "./search.service";
import { ProductRequestPayload } from "./product-request.payload";
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
  searchBy!: string;
  ownedProducts: boolean = false;
  purchasedProducts: boolean = false;
  // Paging and See More
  offset: number = 0;
  limit: number = 20;
  showMore: boolean = true;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private searchService: SearchService,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggin = this.authService.isLoggedIn();
    this.showProducts();
    this.authService.clearSessionStorage();

    // Init subscribers
    this.initSubscribers();
  }

  private initSubscribers() {
    this.searchService.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
      this.getProductsBySearch();
      console.info(`Hello Search Term: ${term}`);
    });

    this.searchService.categoryFilter$.subscribe((term) => {
      this.categoryFilter = term;
      this.getProductsBySearch();
      console.info(`Hello Category Filter: ${term}`);
    });

    this.searchService.priceFilter$.subscribe((term) => {
      this.priceFilter = term;
      this.getProductsBySearch();
      console.info(`Hello Price Filter: ${term}`);
    });

    this.searchService.reviewFilter$.subscribe((term) => {
      this.reviewFilter = term;
      this.getProductsBySearch();
      console.info(`Hello Review Filter: ${term}`);
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
    for (let i = from; i < to; i++) {
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

  showProducts() {
    // this.setting();
    // this.setNoProductToNull();
    this.productService
      .getAllProducts(this.offset, this.limit)
      .subscribe((res) => {
        const from = this.offset * this.limit;
        const to = this.offset * this.limit + res.length;
        if (res.length === 0) {
          this.showMore = false;
          console.log("No More Products ...");
          // this.setNoProductDetails();
        } else {
          this.productsToBeViewed = [...this.productsToBeViewed, ...res];
          this.handleRate(from, to);
          this.offset += 1;
          console.log(`Products from ${from} to ${to} => ${res}`);
          // this.setNoProductToNull();
        }
      });
  }

  viewProduct(id: any) {
    this.setting();
    let productAllInfoToView: ProductAllInfo;
    this.productService
      .productAllInfo(id, this.authService.getUserEmail())
      .subscribe((res) => {
        productAllInfoToView = res;
        console.log(productAllInfoToView);
        this.productService.storageAllInfoForProduct(productAllInfoToView);
      });
  }

  addToCart(productIndex: number) {
    this.setting();
    this.productToCart = this.productsToBeViewed[productIndex];
    this.productToCart.quantity = 1;
    this.productToCart.totalPrice =
      this.productToCart.quantity * this.productToCart.price;

    this.cartService.storageCart(this.productToCart);
    let ele = document.getElementById("to-cart");
    if (ele) {
      ele.style.display = "block";
      ele.style.color = "red";
      ele.style.paddingLeft = "50%";
    }
  }

  private setNoProductToNull() {
    if (this.noProductEle)
      this.noProductEle.nativeElement.style.display = "none";
  }

  private setNoProductDetails() {
    console.log("Marry Christmas :)");
    if (this.noProductEle) {
      this.noProductEle.nativeElement.style.display = "block";
      this.noProductEle.nativeElement.style.fontSize = "22px";
    }
  }

  getManagerOwnerProducts() {
    this.setting();
    this.ownedProducts = true;
    this.userService
      .getManagerOwnedProducts(this.authService.getUserEmail())
      .subscribe((res) => {
        const productsDiv = document.getElementById("products");
        if (productsDiv) productsDiv.innerHTML = "";
        if (res.length === 0) {
          // this.details = [];
          this.setNoProductDetails();
        } else {
          // this.details = res;
          this.setNoProductToNull();
        }
      });
  }

  getCustomerPurchasedProducts() {
    this.setting();
    this.purchasedProducts = true;
    this.userService
      .getCustomerPurchasedProducts(this.authService.getUserEmail())
      .subscribe((res) => {
        const productsDiv = document.getElementById("products");
        if (productsDiv) productsDiv.innerHTML = "";
        if (res.length === 0) {
          // this.details = [];
          this.setNoProductDetails();
        } else {
          // this.details = res;
          this.setNoProductToNull();
        }
      });
  }

  setting() {
    this.ownedProducts = false;
    this.purchasedProducts = false;
  }

  logOut() {
    this.cartService.clearCart();
    this.authService.logout();
  }
}
