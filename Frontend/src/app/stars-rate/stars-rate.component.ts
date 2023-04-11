import { Component, Input } from "@angular/core";

@Component({
  selector: "app-stars-rate",
  template: `
    <mat-icon class="mat-icon-star" *ngFor="let i of star">star</mat-icon>
    <mat-icon class="mat-icon-star" *ngFor="let i of start_half">star_half</mat-icon>
    <mat-icon class="mat-icon-star" *ngFor="let i of start_border">
      star_border
    </mat-icon>
  `,
  styles: [
    `
      .mat-icon-star {
        color: rgb(255, 153, 0);
      }
    `,
  ],
})
export class StarsRateComponent {
  @Input() star: Array<number> = [];
  @Input() start_half: Array<number> = [];
  @Input() start_border: Array<number> = [];
}
