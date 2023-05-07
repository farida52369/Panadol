import { Component, OnInit } from "@angular/core";
import { SearchService } from "../home/search.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"],
})
export class SideBarComponent implements OnInit {
  category!: string;
  price!: string;
  review!: string;

  categoriesList = [
    "Mobiles & Tablets",
    "Computers",
    "Fashion",
    "Health & Beauty",
    "Supermarket",
    "Kitchen",
    "Toys & Games",
    "Sports & Fitness",
    "Books",
    "Others",
  ];

  priceList = ["Descending", "Ascending"];

  constructor(
    private filterService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.category =
      this.route.snapshot.queryParamMap.get("categoryFilter") ?? "";
    this.price = this.route.snapshot.queryParamMap.get("priceFilter") ?? "";
    this.review = this.route.snapshot.queryParamMap.get("reviewFilter") ?? "";
  }

  resetCategory() {
    this.category = "";
    this.filterService.setCategoryFilter("");
    this.resetNavigate("categoryFilter");
  }

  resetPrice() {
    this.price = "";
    this.filterService.setPriceFilter("");
    this.resetNavigate("priceFilter");
  }

  resetReview() {
    this.review = "";
    this.filterService.setReviewFilter("");
    this.resetNavigate("reviewFilter");
  }

  private resetNavigate(removedParams: string) {
    const queryParams: Params = { ...this.route.snapshot.queryParams };
    if (removedParams in queryParams) {
      delete queryParams[removedParams];
      // console.log(queryParams);
    }
    this.router.navigate(["/home"], { queryParams });
  }

  getCategory() {
    // console.log(`Category: ${this.category}`);
    this.filterService.setCategoryFilter(this.category);
    this.navigate({ categoryFilter: this.category });
  }

  getPrice() {
    // console.log(`Price: ${this.price}`);
    this.filterService.setPriceFilter(this.price);
    this.navigate({ priceFilter: this.price });
  }

  getAccrodingToCustomersReview() {
    // console.log(`Review Required: ${this.review}`);
    this.filterService.setReviewFilter(this.review);
    this.navigate({ reviewFilter: this.review });
  }

  private navigate(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: "merge",
    });
  }
}
