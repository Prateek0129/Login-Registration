import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function passwordPattern(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (value === '') {
      return null;
    }
    return !regexp.test(value) ? { 'passwordInvalid': { regexp } } : null;
  };
}