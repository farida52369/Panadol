import { Injectable } from "@angular/core";
import { SessionStorageService } from "ngx-webstorage";
import { CartRequestPayload } from "./cart-request.payload";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private sessionStorage: SessionStorageService) {}

  private cartProducts: Array<CartRequestPayload> = [];

  public storageCart(product: CartRequestPayload) {
    this.cartProducts = this.getCart();

    const productExists = this.cartProducts.find(
      (res) => res.productId === product.productId
    );

    if (!productExists) {
      this.cartProducts.push(product);
    } else {
      if (productExists.quantity !== product.quantity) {
        productExists.quantity = product.quantity;
      }
    }
    this.storeCart();
  }

  removeProduct(removedProduct: CartRequestPayload) {
    this.cartProducts = this.getCart();
    const index = this.cartProducts.findIndex(
      (object) => object.productId === removedProduct.productId
    );
    if (index !== -1) {
      this.cartProducts.splice(index, 1);
      this.storeCart();
    }
  }

  private storeCart() {
    this.sessionStorage.store(
      "cart-products",
      JSON.stringify(this.cartProducts)
    );
  }

  public getCart() {
    return JSON.parse(this.sessionStorage.retrieve("cart-products")) ?? [];
  }

  public clearCart() {
    this.sessionStorage.clear("cart-products");
  }

  getCheckoutProducts(): any {}
}
