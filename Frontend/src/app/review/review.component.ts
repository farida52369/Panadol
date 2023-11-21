import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ReviewService } from "./review.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css"],
})
export class ReviewComponent implements OnInit {
  rating: number = 0;
  reviewForm!: FormGroup;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.initForm();
  }

  setRating(i: any) {
    console.log(`Rate: ${i}`);
    this.rating = i;
    this.reviewForm.controls["rate"].setValue(this.rating);
  }

  private initForm() {
    this.reviewForm = new FormGroup({
      rate: new FormControl("", [Validators.required]),
      comment: new FormControl("", [Validators.required]),
    });
  }

  submitReview() {
    this.reviewService
      .sendReview({
        name: "",
        rate: this.reviewForm.get("rate")?.value,
        comment: this.reviewForm.get("comment")?.value,
      })
      .subscribe({
        next: () => {
          console.info("Review Sent Successfully!!");
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error when sending review!!");
        },
      });
  }
}
