import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ValidatorsService } from "../service/validators.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PasswordResetRequestPayload } from "src/app/auth/forget-password/password-request.payload";
import { Messages } from "src/app/common/messages";
import { ForgetPasswordService } from "src/app/auth/service/forget-password.service";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"],
})
export class ForgetPasswordComponent implements OnInit {
  // Forms needed
  forgetPasswordForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  otpPasswordForm!: FormGroup;
  // Some variables
  isValid: boolean = false;
  email: string = "";
  pageNumber: number = 0;
  errorMessage: string = "";
  OTPErrorMessage: string = "";

  constructor(
    private router: Router,
    protected validator: ValidatorsService,
    private authService: AuthService,
    private forgetPasswordService: ForgetPasswordService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.authService.clearSessionStorage();
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(Messages.EMAIL_PATTERN),
      ]),
    });

    this.resetPasswordForm = new FormGroup(
      {
        password: new FormControl("", [
          Validators.required,
          Validators.pattern(Messages.PASSWORD_PATTERN),
        ]),
        confirmPassword: new FormControl("", [Validators.required]),
      },
      { validators: this.validator.mustMatch("password", "confirmPassword") }
    );

    this.otpPasswordForm = new FormGroup({
      OTP: new FormControl("", [Validators.required]),
    });
  }

  submitRequest(): void {
    this.email = this.forgetPasswordForm.get("email")?.value;
    this.forgetPasswordService.forgetPassword(this.email).subscribe({
      next: () => {
        this.pageNumber += 1;
        this.cleanErrorMessage();
      },
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 403:
            this.errorMessage = Messages.EMAIL_NOT_FOUND;
            break;
          case 500:
            this.errorMessage = Messages.SERVER_ERROR;
            break;
        }
      },
    });
  }

  checkResetToken(): void {
    var passwordResetToken = this.otpPasswordForm.get("OTP")?.value;
    // console.log(`OTP ${passwordResetToken}`);

    this.forgetPasswordService.checkResetToken(passwordResetToken).subscribe({
      next: (data) => {
        // console.log("Token returned: " + typeof data);

        if (data) {
          this.cleanErrorMessage();
          this.pageNumber += 1;
        } else {
          this.OTPErrorMessage = Messages.INVALID_OTP;
        }
      },
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 500:
            this.OTPErrorMessage = Messages.SERVER_ERROR;
            break;
        }
      },
    });
  }

  resetPassword(): void {
    const newPassword = this.resetPasswordForm.get("password")?.value;
    const passwordResetRequest: PasswordResetRequestPayload = {
      email: this.authService.getUserWhoVerifyEmail(),
      newPassword: newPassword,
    };

    // console.log(passwordResetRequest);
    this.forgetPasswordService.resetPassword(passwordResetRequest).subscribe({
      next: (data) => {
        this.cleanErrorMessage();
        // Alert.successAlert("Password has been reset Successfully :)");
        this.router.navigate(["/login"]);
      },
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 500:
            this.errorMessage = Messages.SERVER_ERROR;
            break;
        }
      },
    });
  }

  resendVerificationMail() {
    this.forgetPasswordService.resendPasswordMail().subscribe({
      next: (data) => {
        console.info(`Server Response: ${data}`);
      },
      error: (error) => {
        switch (error.status) {
          case 500:
            this.OTPErrorMessage = Messages.SERVER_ERROR;
            break;
        }
      },
    });
  }

  cleanErrorMessage() {
    this.errorMessage = "";
    this.OTPErrorMessage = "";
  }
}
