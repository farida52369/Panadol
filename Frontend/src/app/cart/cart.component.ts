import { Component, OnInit } from "@angular/core";
import { CartService } from "./cart.service";
import { Router } from "@angular/router";
import { CartRequestPayload } from "./cart-request.payload";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  shipping: number = 5.0;
  product: Array<CartRequestPayload> = [];
  TAX_PERCENTAGE: any = 1.0;
  subtotal: any = 0.0;
  total: any = 0.0;
  tax: any = 0.0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.setCartProducts();
    this.updateTotals();
  }

  setCartProducts() {
    this.product = this.cartService.getCart();
    console.log(this.product)
  }

  viewProduct(productId: number) {
    // View Product Page
    console.log(`Show product ${productId}`);
  }

  removeProduct(id: any) {
    this.cartService.removeProduct(this.product[id]);
    this.product.splice(id, 1);
    this.updateTotals();
  }

  deleteAll() {
    this.product = [];
    this.cartService.clearCart();
    this.updateTotals();
  }

  addOneItem(id: number) {
    console.log(
      "Cart quantity: " +
        this.product[id].quantity +
        "\nIn Stock: " +
        this.product[id].inStock
    );
    if (this.product[id].inStock <= this.product[id].quantity) return;
    this.product[id].quantity++;
    this.cartService.save(this.product[id]);
    this.updateTotals();
  }

  subtractOneItem(id: number) {
    let quantity = this.product[id].quantity;
    if (quantity > 1) {
      this.product[id].quantity--;
      this.cartService.save(this.product[id]);
      this.updateTotals();
    }
  }

  updateTotals() {
    this.total = 0.0;
    let subtotal: number = 0;
    for (let i = 0; i < this.product.length; i += 1) {
      subtotal += this.product[i].quantity * this.product[i].price;
    }
    this.subtotal = subtotal.toFixed(2);
    this.tax = (this.subtotal * (this.TAX_PERCENTAGE / 100.0)).toFixed(2);
    if (this.subtotal > 0.0) {
      this.total = (
        Number(this.subtotal) +
        Number(this.tax) +
        Number(this.shipping)
      ).toFixed(2);
    }
  }

  backHome() {
    this.router.navigate(["/home"]);
  }

  checkout() {
    // Checkout :)
  }
}
