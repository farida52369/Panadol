import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Messages } from "src/app/common/messages";
import { ValidatorsService } from "src/app/auth/service/validators.service";
import { SignUpService } from "../service/sign-up.service";
import { RegisterRequestPayload } from "./register-request.payload";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  registeredAlready!: boolean;
  errorMessage!: string;
  email!: string;

  constructor(
    private authService: AuthService,
    private signUpService: SignUpService,
    protected validator: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.email = this.authService.getUserWhoVerifyEmail();
    if (this.email) {
      this.registeredAlready = true;
    } else {
      this.initForm();
      this.registeredAlready = false;
    }
  }

  initForm(): void {
    this.signupForm = new FormGroup(
      {
        username: new FormControl("", [Validators.required]),
        email: new FormControl("", [
          Validators.required,
          Validators.email,
          Validators.pattern(Messages.EMAIL_PATTERN),
        ]),
        phonenumber: new FormControl("", Validators.required),
        password: new FormControl("", [
          Validators.required,
          Validators.pattern(Messages.PASSWORD_PATTERN),
        ]),
        confirmPassword: new FormControl("", [Validators.required]),
        acceptTerms: new FormControl(false, [Validators.requiredTrue]),
      },
      { validators: this.validator.mustMatch("password", "confirmPassword") }
    );
  }

  // REGISTER NEW USER
  registerNewUser(user: RegisterRequestPayload): void {
    this.signUpService.registerNewUser(user).subscribe({
      next: () => {
        this.email = user.email;
        this.registeredAlready = true;
        this.cleanErrorMessage();
        console.log("New User Registered");
      },
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 403:
            this.errorMessage = Messages.EMAIL_IN_USE(user.email);
            break;
          case 500:
            this.errorMessage = Messages.SERVER_ERROR;
            break;
        }
        console.error("7AZ AWFR EL MARA EL GAYA!!\nError: " + error.message);
      },
      complete: () => {
        console.info("Complete register new user!");
      },
    });
  }

  submit(): void {
    if (this.signupForm.invalid) {
      console.log("Invalid form");
      return;
    }

    const username = this.signupForm.get("username")?.value;
    const email = this.signupForm.get("email")?.value;
    const phonenumber = this.signupForm.get("phonenumber")?.value;
    const password = this.signupForm.get("password")?.value;
    const user: RegisterRequestPayload = {
      userName: username,
      email: email,
      password: password,
      phoneNumber: phonenumber,
    };
    this.registerNewUser(user);
  }

  resendVerificationMail() {
    this.signUpService.resendVerificationMail().subscribe({
      next: () => {
        this.cleanErrorMessage();
        console.info("Resend Verification Mail Successfuly");
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = Messages.SERVER_ERROR;
        console.error("Error While Resend Mail Verification: " + error);
      },
      complete: () => {
        console.info("Completed Resend Verification Mail");
      },
    });
  }

  cleanErrorMessage() {
    // console.log('Hello')
    this.errorMessage = "";
  }
}
