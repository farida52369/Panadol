import { Injectable } from "@angular/core";
import { ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";
@Injectable({
  providedIn: "root",
})
export class ValidatorsService {
  currentPassFieldType!: boolean;
  passwordFieldType!: boolean;
  conPasswordFieldType!: boolean;
  constructor() {
    this.currentPassFieldType = false;
    this.passwordFieldType = false;
    this.conPasswordFieldType = false;
  }

  public mustMatch(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordCtrl = control.get(password);
      const confirmCtrl = control.get(confirmPassword);

      if (!passwordCtrl || !confirmCtrl) {
        return null;
      }
      if (confirmCtrl.errors && !confirmCtrl.errors["misMatch"]) {
        return null;
      }
      if (passwordCtrl.value !== confirmCtrl.value) {
        confirmCtrl.setErrors({ misMatch: true });
        return { misMatch: true };
      } else {
        confirmCtrl.setErrors(null);
        return null;
      }
    };
  }

  toggleCurrentPassFieldType() {
    this.currentPassFieldType = !this.currentPassFieldType;
  }

  togglePasswordFieldType() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  toggleConPasswordFieldType() {
    this.conPasswordFieldType = !this.conPasswordFieldType;
  }
}
