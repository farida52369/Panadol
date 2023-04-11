import { Component } from "@angular/core";
import { SearchService } from "../home/search.service";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"],
})
export class SideBarComponent {
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

  priceList = [
    "Descending",
    "Ascending"
  ]
  constructor(private filterService: SearchService) {}

  resetCategory() {
    this.category = "";
    this.filterService.setCategoryFilter("");
  }

  resetPrice() {
    this.price = "";
    this.filterService.setPriceFilter("");
  }

  resetReview() {
    this.review = "";
    this.filterService.setReviewFilter("");
  }

  getCategory() {
    // console.log(`Category: ${this.category}`);
    this.filterService.setCategoryFilter(this.category);
  }

  getPrice() {
    // console.log(`Price: ${this.price}`);
    this.filterService.setPriceFilter(this.price);
  }

  getAccrodingToCustomersReview() {
    // console.log(`Review Required: ${this.review}`);
    this.filterService.setReviewFilter(this.review);
  }
}
