import { Injectable } from "@angular/core";
import { ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";
@Injectable({
  providedIn: "root",
})
export class ValidatorsService {
  passwordFieldType!: boolean;
  conPasswordFieldType!: boolean;
  constructor() {
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

  togglePasswordFieldType() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  toggleConPasswordFieldType() {
    this.conPasswordFieldType = !this.conPasswordFieldType;
  }
}
