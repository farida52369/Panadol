import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Alert } from "src/app/common/alert";
import { Messages } from "src/app/common/messages";
import { SignUpService } from "../service/sign-up.service";
import { BusinessInfoPayload } from "./seller-payload/business-info.payload";
import { IdentityInfoPayload } from "./seller-payload/identity-info.payload";
import { PaymentMethodPayload } from "./seller-payload/payment-method.payload";

@Component({
  selector: "app-seller",
  templateUrl: "./seller.component.html",
  styleUrls: ["./seller.component.css"],
})
export class SellerComponent implements OnInit {
  // Needed Forms
  businessInfo!: FormGroup;
  paymentMethod!: FormGroup;
  identityVerification!: FormGroup;
  // For component html file restrictions
  expiryMonth!: number;
  expiryYear!: number;
  legalBirthToSell!: string;
  nationalIDExpirationDate!: string;
  noNextUntilProvidingPayment: boolean = true;
  // Payload Info
  businessInfoPayload!: BusinessInfoPayload;
  paymentMethodPayload!: Array<PaymentMethodPayload>;
  identityVerificationPayload!: IdentityInfoPayload;
  // Regex :)
  creditCardValidation: RegExp =
    /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/g;
  // Steps var
  step = 1;

  constructor(private authService: SignUpService, private router: Router) {}

  ngOnInit(): void {
    this.paymentMethodPayload = new Array();
    this.initForms();
  }

  initForms(): void {
    // Setting Expiration dates
    const date = new Date();
    this.expiryMonth = date.getMonth() + 2;
    this.expiryYear = date.getFullYear();
    this.legalBirthToSell = `${(this.expiryYear - 21).toString()}-01-01`;
    if (this.expiryMonth > 12) {
      this.expiryYear += 1;
      this.expiryMonth = 1;
    }
    const month = this.expiryMonth.toString();
    this.nationalIDExpirationDate = `${this.expiryYear.toString()}-${
      month.length == 1 ? "0" + month : month
    }-01`;

    // Setting Forms
    this.businessInfo = new FormGroup({
      country: new FormControl("", [Validators.required]),
      governorate: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      area: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      apartment: new FormControl("", [Validators.required]),
      uniqueBusinessName: new FormControl("", [Validators.required]),
    });

    this.paymentMethod = new FormGroup(
      {
        cardNumber: new FormControl("", [
          Validators.required,
          Validators.pattern(this.creditCardValidation),
        ]),
        expiryMonth: new FormControl(this.expiryMonth, [Validators.required]),
        expiryYear: new FormControl(this.expiryYear, [Validators.required]),
        cardHolderName: new FormControl("", [Validators.required]),
      },
      {
        validators: this.mustBeValidMonthForCreditCard(
          "expiryMonth",
          "expiryYear"
        ),
      }
    );

    this.identityVerification = new FormGroup(
      {
        nationalID: new FormControl("", [Validators.required]),
        expirationDateOfNationalID: new FormControl(
          this.nationalIDExpirationDate,
          [Validators.required]
        ),
        firstName: new FormControl("", [Validators.required]),
        middleName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        dateOfBirth: new FormControl(this.legalBirthToSell, [
          Validators.required,
        ]),
      },
      {
        validators: [
          this.mustBeValidExpirationForNationalId("expirationDateOfNationalID"),
          this.mustBeValidDateOfBirth("dateOfBirth"),
        ],
      }
    );
  }

  // VALIDATORS
  // Validators ymken Bassant tstray7 :)
  mustBeValidMonthForCreditCard(month: string, year: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const monthChosen = control.get(month);
      const yearChosen = control.get(year);

      if (
        monthChosen &&
        yearChosen &&
        this.expiryMonth > monthChosen.value &&
        this.expiryYear === yearChosen.value
      ) {
        // console.log("Error In Validation Month");
        monthChosen.setErrors({ error: true });
        yearChosen.setErrors({ error: true });
        return { error: true };
      }
      // console.log("Done Validation");
      monthChosen?.setErrors(null);
      yearChosen?.setErrors(null);
      return null;
    };
  }

  mustBeValidExpirationForNationalId(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const expiryDate = control.get(date);

      if (expiryDate && this.nationalIDExpirationDate > expiryDate.value) {
        expiryDate.setErrors({ error: true });
        return { error: true };
      }

      expiryDate?.setErrors(null);
      return null;
    };
  }

  mustBeValidDateOfBirth(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateOfBirth = control.get(date);

      if (dateOfBirth && this.legalBirthToSell < dateOfBirth.value) {
        dateOfBirth.setErrors({ error: true });
        return { error: true };
      }

      dateOfBirth?.setErrors(null);
      return null;
    };
  }

  // INTERACTIONS
  next() {
    if (this.step == 1) {
      if (this.businessInfo.invalid) return;
      this.step++;

      this.businessInfoPayload = {
        country: this.businessInfo.get("country")?.value,
        governorate: this.businessInfo.get("governorate")?.value,
        city: this.businessInfo.get("city")?.value,
        area: this.businessInfo.get("area")?.value,
        street: this.businessInfo.get("street")?.value,
        apartment: this.businessInfo.get("apartment")?.value,
        uniqueBusinessName: this.businessInfo.get("uniqueBusinessName")?.value,
      };
      console.info(this.businessInfoPayload);

      // Inform The Browser
      console.info("To Step 2");
    } else if (this.step == 2) {
      // 370341378581367
      this.step++;
      console.log("To Step 3");
    }
  }

  savePaymentMethod() {
    this.noNextUntilProvidingPayment = false;

    this.paymentMethodPayload.push({
      cardNumber: this.paymentMethod.get("cardNumber")?.value,
      expiryMonth: this.paymentMethod.get("expiryMonth")?.value,
      expiryYear: this.paymentMethod.get("expiryYear")?.value,
      cardHolderName: this.paymentMethod.get("cardHolderName")?.value,
    });
    console.info(this.paymentMethodPayload);
  }

  endOfStory() {
    this.identityVerificationPayload = {
      idNational: {
        nationalID: this.identityVerification.get("nationalID")?.value,
        expiryDate: this.identityVerification.get("expirationDateOfNationalID")
          ?.value,
      },
      firstName: this.identityVerification.get("firstName")?.value,
      middleName: this.identityVerification.get("middleName")?.value,
      lastName: this.identityVerification.get("lastName")?.value,
      dateOfBirth: this.identityVerification.get("dateOfBirth")?.value,
    };
    console.info(this.identityVerificationPayload);

    // Finally: Send it to the backend
    this.authService
      .registerNewSeller({
        businessInfo: this.businessInfoPayload,
        identityInfo: this.identityVerificationPayload,
        paymentMethods: this.paymentMethodPayload,
      })
      .subscribe({
        next: (data) => {
          Alert.successAlert(Messages.CONGRATULATE_SELLER);
          console.info(`Received From Server when Sending New Seller: ${data}`);
          this.router.navigate(["/home"]);
        },
        error: (error: HttpErrorResponse) => {
          Alert.errorAlert(Messages.ERROR_REGITERING_AS_SELLER);
          console.error(`7az Awfar el mara el gaya\nError: ${error}`);
        },
        complete: () => {
          console.info("Complete Sending New Seller!");
        },
      });
  }
}
