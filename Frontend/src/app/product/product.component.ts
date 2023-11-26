import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../services/product/product.service";
import { SpecificProductInfoPayload } from "../offer-product/offer-product-payload/specific-product-info.payload";
import { StarTypesPayload } from "../stars-rate/star-types.payload";
import { RateHandle } from "../common/rate-handle";
import { ReviewResponsePayload } from "../review/review-response.payload";
import { ReviewService } from "../review/review.service";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  main_image: any;
  numOfReviews: number = 2;
  numOfComments: any = 1;
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

  productId!: number;
  currentProduct!: SpecificProductInfoPayload;
  currentProductRate!: StarTypesPayload;
  productReviews!: Array<ReviewResponsePayload>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewsService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productId = params["productId"];
      // console.log("Product Id: " + this.productId);
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
  }

  changeImage(element: any) {
    // const src = element.target.getAttribute('src');
    // this.main_image = element.src;
    this.main_image = element;
    console.log(`Router: ${this.router.url}`);
  }

  addToCart() {}

  getReviews() {
    console.log(`Router: ${this.router.url}`);
    this.reviewsService.getProductReviews(this.productId).subscribe({
      next: (res) => {
        this.productReviews = res;
        console.log("We got All Product Reviews");
      },
    });
  }
}
