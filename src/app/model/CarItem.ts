import { Product } from "./product";

export class CarItem{
  id: number;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;

  constructor(produto: Product){
    this.id = produto.id;
    this.name = produto.name;
    this.imageUrl = produto.imageUrl;
    this.unitPrice = produto.unitPrice;
    this.quantity = 0;
  }
}
