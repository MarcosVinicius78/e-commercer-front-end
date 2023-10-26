import { FormControl, ValidationErrors } from "@angular/forms";

export class CheckoutValidar{

  static epacoBranco(control: FormControl): ValidationErrors | null{

    if (control.value[0] === " " || control.value[control.value.length - 1] == 0) {
      return {'espaco': true};
    }else{
      return  null;
    }
  }
}
