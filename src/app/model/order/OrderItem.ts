import { CarItem } from '../CarItem';
export class OrderItem {

  productId: number;
  imageUrl: string;
  unitPrice: number;
  quantity: number;

  constructor(carItem: CarItem) {
    this.imageUrl = carItem.imageUrl;
    this.unitPrice = carItem.unitPrice;
    this.quantity = carItem.quantity;
    this.productId = carItem.id;
  }
}
