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

  details: any;
  productToCart: any;
  @ViewChild("noProductFound") noProductEle: ElementRef | undefined;
  loggin!: boolean;
  isManager!: Boolean;
  searchBy!: string;
  page: any = 1;
  ownedProducts: boolean = false;
  purchasedProducts: boolean = false;
  offset: number = 0;
  limit: number = 10;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private searchService: SearchService,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggin = this.authService.isLoggedIn();
    // this.showProducts();
    // if (this.loggin) this.isManagerSubscribe();
    this.authService.clearSessionStorage();

    // Init subscribers
    this.initSubscribers();

    // ADD
    /*
    this.productsToBeViewed.push({
      productId: "1",
      image: "",
      title: "HEllo",
      rate: 4,
      inStock: 45,
      price: 1200,
    });
    */
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
        this.reviewFilter || "0.0",
        this.offset,
        this.limit
      )
      .subscribe({
        next: (data) => {
          this.productsToBeViewed = data;
          // this.offset += this.limit;
          console.info("Get products from server!");
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

  handlePageChange(e: any) {
    this.page = e;
    console.log(this.page);
  }

  getCategory(category: string) {
    this.setting();
    this.searchBy = `Category: ${category}`;
    // Adjust it on the services file -- Add the specific route on the server side
    this.productService.getProductsByCategory(category).subscribe((res) => {
      const productsDiv = document.getElementById("products");
      if (productsDiv) productsDiv.innerHTML = "";
      if (res.length === 0) {
        this.details = [];
        this.setNoProductDetails();
      } else {
        this.details = res;
        this.setNoProductToNull();
      }
      // this.details = res;
    });
  }

  sortBy(sort: string) {
    this.setting();
    this.searchBy = `Sorting By: ${sort}`;
    this.setNoProductToNull();
    this.productService.getProductsSorted(sort).subscribe((res) => {
      const productsDiv = document.getElementById("products");
      if (productsDiv) productsDiv.innerHTML = "";
      if (res.length === 0) {
        this.details = [];
        this.setNoProductDetails();
      } else {
        this.details = res;
        this.setNoProductToNull();
      }
      // this.details = res;
    });
  }

  getProductsByWord(word: any) {
    this.setting();
    /*
    if (word) {
      this.searchBy = `Word: ${word}`;
      this.searchService.getProductsByWord(word).subscribe((res) => {
        const productsDiv = document.getElementById("products");
        if (productsDiv) productsDiv.innerHTML = "";
        if (res.length === 0) {
          this.details = [];
          this.setNoProductDetails();
        } else {
          this.details = res;
          this.setNoProductToNull();
        }
      });
    } else this.showProducts();*/
  }

  private showProducts() {
    this.setting();
    this.setNoProductToNull();
    this.productService.getAllProducts().subscribe((res) => {
      const productsDiv = document.getElementById("products");
      if (productsDiv) productsDiv.innerHTML = "";
      console.log("All Products => " + res);
      if (res.length === 0) {
        this.details = [];
        this.setNoProductDetails();
      } else {
        this.details = res;
        this.setNoProductToNull();
      }
      // this.details = res;
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
    this.productToCart = this.details[productIndex];
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
          this.details = [];
          this.setNoProductDetails();
        } else {
          this.details = res;
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
          this.details = [];
          this.setNoProductDetails();
        } else {
          this.details = res;
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
