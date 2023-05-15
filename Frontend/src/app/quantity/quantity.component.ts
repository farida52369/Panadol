import { Component, Input } from "@angular/core";
// ng g c quantity --inline-template --inline-style --skip-tests
@Component({
  selector: "app-quantity",
  template: `<div class="input-group">
    <div class="minus">
      <button class="quantity-button" (click)="decreaseQuantity()">
        <mat-icon>remove</mat-icon>
      </button>
    </div>
    <input
      type="number"
      class="input-number"
      min="0"
      [max]="maxQuantity"
      [value]="quantity"
      id="quantity-value"
      #quantityValue
      (change)="onChange(quantityValue.value)"
      (keydown)="onKeyDown($event)"
    />
    <div class="plus">
      <button class="quantity-button" (click)="increaseQuantity()">
        <mat-icon>add</mat-icon>
      </button>
    </div>
  </div> `,
  styles: [
    `
      .input-group {
        width: 151px;
        height: 46px;
        display: inline-block;
      }

      .plus,
      .minus {
        width: 35px;
        height: 44px;
        position: absolute;
        top: 0;
        overflow: hidden;
      }

      .minus {
        left: 0;
      }

      .plus {
        right: 0;
      }

      .plus,
      .minus,
      .quantity-button {
        /* Display Center */
        display: flex;
        align-items: center;
        justify-content: center;

        /* Border */
        border-radius: 0px;
        border: none;
      }

      .quantity-button {
        width: 100%;
        padding: 0;
        background: transparent;
        color: #282828;
      }

      .quantity-button:hover {
        color: #f7941d;
      }

      .input-number {
        width: 100%;
        height: 44px;
        text-align: center;
        border-radius: 0px;
        border: 1px solid #eceded;
        overflow: hidden;
        font-size: 16px;
        font-weight: 100;
        padding: 0px 36px;
        color: #7b7b7b;
      }

      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }
    `,
  ],
})
export class QuantityComponent {
  @Input() quantity!: number;
  @Input() maxQuantity!: number;

  decreaseQuantity() {
    if (this.quantity >= 1) {
      this.quantity--;
    }
  }

  onChange(val: string) {
    if (Number(val) < 0) {
      this.quantity = 0;
      return;
    } 

    if (Number(val) > this.maxQuantity) {
      this.quantity = this.maxQuantity;
      return;
    }

    this.quantity = Number(val);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "-" || event.key === "+") {
      event.preventDefault();
    }
  }

  increaseQuantity() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }
}
