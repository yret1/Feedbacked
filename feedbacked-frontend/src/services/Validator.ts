// password.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('passwordconf');

    // If either control doesn't exist, return null
    if (!password || !confirmPassword) return null;

    // Return error if passwords don't match, null otherwise
    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  };
}
