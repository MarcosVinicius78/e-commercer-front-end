import { Paises } from "./Paises";

export class Address{
  constructor(public rua: string,
              public cidade: string,
              public pais: string,
              public estado: string,
              public codigoPostal: string){}
}
