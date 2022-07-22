import { AbstractControl } from '@angular/forms';

export class Validations {
  public validInput(c: AbstractControl): { [key: string]: boolean } | null {
    const value = c.value;
    const re = /\S+@\S+\.\S+/;
    if (value) {
      if (value.match(new RegExp(/^[2][5][4][0-9]{9}$/)) || re.test(value)) {
        return null;
      }
      return { isValid: true };
    }
    return null;
  }

  greatertThanZeroInputValidator(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    if (!control) {
      return null;
    }
    if (control.errors && !control.errors.patternError) {
      return null;
    }
    if (control.value > 0) {
      return null;
    }
    return { patternError: true };
  }

  
  /**
   * Ensures that a form fields is not composed of spaces only,
   * @param control
   */
  public ensureIsString(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    const value: string = control.valueChanges ? control.value : '';

    return value.trim().length === 0 ? { isNotString: true } : null;
  }

  public validateWhiteSpace(control: AbstractControl): { [key: string]: boolean } | null {
    const name = control.value ? control.value.charAt(0): ''
    if (name === ' ') {
      return { 'validateSpace': true };
    }
    return null;
   }

  // pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')

  public optionalValidatorForString(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    const value: string = control.valueChanges ? control.value : '';
    if (control.value === null) {
      return null;
    }
    return value === '' || value.trim().length > 0 ? null : { value: true };
  }

  public startWithPlus = (
    control: AbstractControl,
  ): { [key: string]: any } | null => {
    const valid = control.value.charAt(0) === '+';

    return !valid ? { startWithPlus: { value: control.value } } : null;
  };
}
