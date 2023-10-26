import { FormControl, ValidationErrors } from "@angular/forms";

export class CheckoutValidacao {

  static espaco(controle: FormControl): ValidationErrors{

    if (controle.value != null && controle.value.trim().length === 0) {
      return {'espaco': true}
    }else{
      return {'vazio': null};
    }
  }
}
