import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../cart/cart.service";
import { ProductService } from "../services/product/product.service";
import { CartRequestPayload } from "../cart/cart-request.payload";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent {
  isOwner: boolean = false;
  product: any;
  noPriceEditing: boolean = true;
  noInStockEditing: boolean = true;
  noCategoryEdit: boolean = true;
  noTitleEdit: boolean = true;
  noDescriptionEditing: boolean = true;

  toCart: CartRequestPayload = {
    productId: 0,
    title: "",
    price: 0,
    inStock: 0,
    description: "",
    image: "",
    quantity: 0,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.product = this.productService.getAllInfo();
    this.isOwner = this.product.isOwner;
  }

  editPrice() {
    this.noPriceEditing = false;
  }
  exitEditPrice() {
    this.noPriceEditing = true;
    this.product.price = (<HTMLInputElement>(
      document.getElementById("price_after_edit")
    )).value;
  }

  editInStock() {
    this.noInStockEditing = false;
  }
  exitEditInStock() {
    this.noInStockEditing = true;
    this.product.inStock = (<HTMLInputElement>(
      document.getElementById("inStock_after_edit")
    )).value;
  }

  editCategory() {
    this.noCategoryEdit = false;
  }
  exitEditCategory() {
    this.noCategoryEdit = true;
    this.product.category = (<HTMLInputElement>(
      document.getElementById("cat_after_edit")
    )).value;
  }

  editTitle() {
    this.noTitleEdit = false;
  }
  exitEditTitle() {
    this.noTitleEdit = true;
    this.product.title = (<HTMLInputElement>(
      document.getElementById("title_after_edit")
    )).value;
  }

  editDescription() {
    this.noDescriptionEditing = false;
  }
  exitEditDescription() {
    this.noDescriptionEditing = true;
    this.product.description = (<HTMLInputElement>(
      document.getElementById("desc_after_edit")
    )).value;
  }

  backHome() {
    this.router.navigateByUrl("home", { state: { logged: true } });
  }

  addToCart() {
    this.toCart = this.product;
    this.toCart.quantity = 1;

    this.cartService.storageCart(this.toCart);
    let ele = document.getElementById("to-cart");
    if (ele) {
      ele.style.display = "block";
      ele.style.color = "black";
      ele.style.paddingLeft = "10px";
    }
  }
}
