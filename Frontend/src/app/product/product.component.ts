import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../services/product/product.service";
import { SpecificProductInfoPayload } from "../offer-product/offer-product-payload/specific-product-info.payload";
import { StarTypesPayload } from "../stars-rate/star-types.payload";
import { RateHandle } from "../common/rate-handle";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  Number(arg0: string) {
    throw new Error("Method not implemented.");
  }
  main_image: any;
  title: any =
    "DREAM PAIRS Kitten Heels for Women Comfortable Low Heels Sandals Suqare Open Toe Cute Wedding Party Evening Prom Dance Strap Dress Pump Sandals Shoes";
  numOfReviews: any = 220;
  price: any = 233.78;
  shortDescription: any =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
  longDescription: any =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
  keyFeatures: Array<string> = [
    "HELLO WORLD",
    "HELLO WORLD",
    "HELLO WORLD",
    "HELLO WORLD",
    "HELLO WORLD",
  ];

  numOfComments: any = 1;
  ratingOverall: any = 4.5;
  comments: any = [
    {
      name: "Fareeda Ragab",
      rate: 4.5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      name: "Eman Ragab",
      rate: 4.8,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
  ];

  images = [
    "assets/images/modal1.png",
    "assets/images/bx-slider1.jpg",
    "assets/images/bx-slider1.jpg",
    "assets/images/bx-slider1.jpg",
  ];

  commentForm!: FormGroup;

  rating: number = 0;
  quantity: number = 1;

  productId!: number;
  currentProduct!: SpecificProductInfoPayload;
  currentProductRate!: StarTypesPayload;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productId = params["productId"];
      console.log("Product Id: " + this.productId);
      this.productService.getSpecificProduct(this.productId).subscribe({
        next: (res) => {
          this.currentProduct = res;
          console.log(this.currentProduct);
          this.currentProductRate = RateHandle.getSuitableRate(
            this.currentProduct.basicInfo.rate
          );
          this.main_image = this.currentProduct.images[0];
        },
      });
    });
    this.initForm();
  }

  setRating(i: any) {
    console.log(`I: ${i}`);
    this.rating = i;
  }

  private initForm() {
    this.commentForm = new FormGroup({
      rate: new FormControl("", [Validators.required]),
      comment: new FormControl("", [Validators.required]),
    });
  }

  changeImage(element: any) {
    // const src = element.target.getAttribute('src');
    // this.main_image = element.src;
    this.main_image = element;
    console.log(`Router: ${this.router.url}`);
  }

  getReviews() {
    console.log(`Router: ${this.router.url}`);
  }

  decreaseQuantity() {}

  increaseQuantity() {}
}
