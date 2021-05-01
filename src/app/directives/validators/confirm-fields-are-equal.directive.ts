import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator,FormGroup } from "@angular/forms";
import {Attribute, Directive, Input} from "@angular/core";

@Directive({
  selector: '[confirmEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmFieldsAreEqualDirective,
    multi: true
  }]
})
export class ConfirmFieldsAreEqualDirective implements Validator {
  constructor(@Attribute('confirmEqualValidator') public comparer: string,
              @Attribute('parent') public parent: string){}
  validate(c: any): {[key: string]: any} {
    const e = c.root.get(this.comparer);

    if (e && c.value !== e.value && !this.isParent) {
      return { compare: true };
    }

    if (e && c.value === e.value && this.isParent) {
      delete e.errors['compare'];
      if (!Object.keys(e.errors).length) {
        e.setErrors(null);
      }
    }

    if (e && c.value !== e.value && this.isParent) {
      e.setErrors({ compare: true });
    }
  }

  private get isParent() {
    if (!this.parent) {
      return false;
    }
    return this.parent === 'true' ? true : false;
  }

}
