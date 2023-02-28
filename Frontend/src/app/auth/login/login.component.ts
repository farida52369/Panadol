import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Alert } from "src/app/common/alert";
import { Messages } from "src/app/common/messages";
import { ValidatorsService } from "src/app/auth/service/validators.service";
import { LoginRequestPayload } from "./login-request.payload";
import { SignInService } from "../service/sign-in.service";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signinEmailForm!: FormGroup;
  signinPasswordForm!: FormGroup;

  isValid: boolean = false;
  errorMessage: string = "";
  email: string | undefined;
  isError: boolean | undefined;
  display: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private signInService: SignInService,
    protected validator: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.authService.clearSessionStorage();
  }

  private initForm(): void {
    this.signinEmailForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(Messages.EMAIL_PATTERN),
      ]),
    });
    this.signinPasswordForm = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(Messages.PASSWORD_PATTERN),
      ]),
    });
  }

  private signin(user: LoginRequestPayload): void {
    this.signInService.login(user).subscribe({
      next: (res) => {
        this.isError = false;
        Alert.successAlert("Welcome back, Logged in Successfully :)");
        this.router.navigate(["/home"]);
      },
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 403:
            this.errorMessage = Messages.PASSWORD_ERROR;
            break;
          case 500:
            this.errorMessage = Messages.SERVER_ERROR;
            break;
        }
      },
    });
  }

  submit(): void {
    const email = this.authService.getUserWhoVerifyEmail();
    console.log("Email Address " + email);
    const password = this.signinPasswordForm.get("password")?.value;
    const user: LoginRequestPayload = {
      email: email,
      password: password,
    };
    this.signin(user);
  }

  checkEmail(): void {
    this.signInService
      .checkEmail(this.signinEmailForm.get("email")?.value)
      .subscribe({
        next: (checked: boolean) => {
          this.display = checked;
          if (!this.display) {
            this.errorMessage = Messages.EMAIL_NOT_FOUND;
          } else this.cleanErrorMessage();
        },
        error: (error: HttpErrorResponse) => {
          switch (error.status) {
            case 500:
              this.errorMessage = Messages.SERVER_ERROR;
              break;
            case 403:
              this.errorMessage = Messages.EMAIL_NOT_FOUND;
              break;
          }
        },
      });
    this.email = this.signinEmailForm.get("email")?.value;
  }

  change() {
    this.cleanErrorMessage();
    this.display = false;
  }

  cleanErrorMessage() {
    this.errorMessage = "";
  }
}
