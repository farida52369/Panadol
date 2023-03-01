import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ProfileService } from "./profile.service";
import { ValidatorsService } from "../auth/service/validators.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Messages } from "../common/messages";
import { ProfileResponsePayload } from "./profile-request.payload";
import { Alert } from "../common/alert";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  isEditableEmail: boolean = false;
  emailValue!: string;
  isEditableUsername: boolean = false;
  usernameValue!: string;
  isEditablePassword: boolean = false;
  isEditablePhoneNumber: boolean = false;
  phoneNumberValue!: string;

  changePasswordForm!: FormGroup;
  errorMessage: string = "";
  profileResponsePayload!: ProfileResponsePayload;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    protected validator: ValidatorsService
  ) {
    this.profileResponsePayload = {
      email: "",
      userName: "",
      phoneNumber: "",
    };
  }

  ngOnInit(): void {
    this.profileService.getProfileRequest().subscribe({
      next: (data) => {
        this.profileResponsePayload = data;
      },
      error: (error) => {
        console.error(error);
        Alert.errorAlert(Messages.ERROR_IN_PROFILE);
      },
    });
  }

  // Email
  editEmail() {
    this.isEditableEmail = true;
    // set other variables
    this.isEditablePhoneNumber = false;
    this.isEditableUsername = false;
    this.isEditablePassword = false;
  }

  saveEmail() {
    this.isEditableEmail = false;
  }

  // User Name
  editUsername() {
    this.isEditableUsername = true;
    // set other variables
    this.isEditablePhoneNumber = false;
    this.isEditableEmail = false;
    this.isEditablePassword = false;
  }

  saveUsername() {
    this.isEditableUsername = false;
    console.log(`New User Name: ${this.usernameValue}`);
    this.profileService.changeUsername(this.usernameValue).subscribe({
      next: (data) => {
        if (data) {
          console.info("User Name changed successfully");
        }
      },
      error: (error) => {
        console.error(`Error when changing User Name ${error}`);
      },
    });
  }

  // Phone Number
  editPhoneNumber() {
    this.isEditablePhoneNumber = true;
    // set other variables
    this.isEditableUsername = false;
    this.isEditableEmail = false;
    this.isEditablePassword = false;
  }

  savePhoneNumber() {
    this.isEditablePhoneNumber = false;
    console.log(`New Phone Number: ${this.phoneNumberValue}`);
    this.profileService.changePhoneNumber(this.phoneNumberValue).subscribe({
      next: (data) => {
        if (data) {
          console.info("Phone Number changed successfully");
        }
      },
      error: (error) => {
        console.error(`Error when changing Phone Number ${error}`);
      },
    });
  }

  // Password
  editPassword() {
    this.isEditablePassword = true;
    // set other variables
    this.isEditablePhoneNumber = false;
    this.isEditableEmail = false;
    this.isEditableUsername = false;

    this.initForm();
  }

  initForm() {
    this.changePasswordForm = new FormGroup(
      {
        currentPassword: new FormControl("", [
          Validators.required,
          Validators.pattern(Messages.PASSWORD_PATTERN),
        ]),
        newPassword: new FormControl("", [
          Validators.required,
          Validators.pattern(Messages.PASSWORD_PATTERN),
        ]),
        confirmNewPassword: new FormControl("", [Validators.required]),
      },
      {
        validators: this.validator.mustMatch(
          "newPassword",
          "confirmNewPassword"
        ),
      }
    );
  }

  savePassword() {
    const currentPassword =
      this.changePasswordForm.get("currentPassword")?.value;
    const newPassword = this.changePasswordForm.get("newPassword")?.value;
    this.profileService
      .changePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
      .subscribe({
        next: (data) => {
          if (data) {
            console.info("Password changed successfully");
            this.isEditablePassword = false;
          } else {
            this.errorMessage = Messages.PASSWORD_ERROR;
          }
        },
        error: (error) => {
          this.errorMessage = Messages.PASSWORD_ERROR;
          console.error(`Error when changing Phone Number ${error}`);
        },
      });
  }

  cleanErrorMessage() {
    this.errorMessage = "";
  }

  returnHome() {
    this.router.navigate(["/home"]);
  }

  uneditPassword() {
    this.router.navigate(["/user/profile"]).then(() => {
      location.reload();
    });
  }
}
