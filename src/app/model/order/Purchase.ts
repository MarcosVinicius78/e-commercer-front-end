import { OrderItem } from './OrderItem';
import { Address } from "../Address";
import { Cliente } from "../Cliente";
import { Order } from "./Order";

export class Purchase {

  cliente!: Cliente;
  address!: Address;
  order!: Order;
  orderItems!: OrderItem[];

  constructor() { }
}
